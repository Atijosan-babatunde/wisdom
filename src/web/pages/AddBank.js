import { Fragment, useEffect, useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import DatePicker from 'react-datepicker';
import { addNuban, getSupportedNubans, resolveNuban } from "../../services/nuban";
import cogoToast from "cogo-toast";

export default function AddBank({ history }) {
    const maxDate = new Date();
    const [merchant] = useSessionStorage("merchant", {});
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [banks, setBanks] = useState([]);
    const [result, setResult] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [step, setCurrentStep] = useState(0);
    const [accountName, setAccountName] = useState(null);

    useEffect(() => {
        var myModal = new window.bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
        });

        myModal.show();

        return (() => {
            myModal.hide();
        })
    }, []);

    useEffect(() => {
        // CSS HACK
        let el = document.querySelector(".react-datepicker__input-container");
        if (el) el.parentElement.style.width = "82%";
        setLoading(true);
        getSupportedNubans().then((res) => {
            console.log(res)
            setBanks(res.payload)
            setResult(res.payload.filter((v) => ["044", "011", "058", "232", "032", "033"].includes(v.code)))
        }).catch(() => {
            console.log("Error")
        }).finally((e) => {
            setLoading(false)
        })
    }, []);

    function searchBanks(ev) {
        let keyword = ev.target.value.toLowerCase().trim();
        keyword === "" ? setResult(banks.filter((v) => ["044", "011", "058", "232", "032", "033"].includes(v.code))) : setResult(banks.filter((v) => v.name.toLowerCase().includes(keyword)).slice(0, 6))
        setKeyword(keyword)
    }

    function closeModal() {
        history.goBack();
    }

    function showDefault(el) {
        el.target.onError = null;
        // el.target.src = "/img/brands/default.svg"
        console.log(el.target.src)
        el.target.src = "https://cdn2.iconfinder.com/data/icons/business-finance-170/48/bank-down-loss-arrow-decrease-512.png"
    }

    function shadowFetchNuban(ev) {
        let accountNumber = ev.target.value;
        if (accountNumber.trim().length === 10) {
            const { bank } = ev.target.form;
            const bankCode = bank.value;


            console.log(accountNumber, bankCode)

            resolveNuban({ accountNumber, bankCode }).then((re) => {
                setAccountName(re.payload.account_name);
            }).catch((e) => {
                console.log(e)
                // Log catch
            }).finally(() => {
                // Stop loader
            });
        }
    }

    function submit(ev) {
        ev.preventDefault();
        const { bank, account } = ev.target;
        const bankCode = bank.value;
        const accountNumber = account.value;
        const bvn = ev.target.bvn.value;
        const selected = Array.from(bank).find((v) => v.checked)
        const bankName = selected.dataset.name;

        addNuban({ bankName, bankCode, accountNumber, bvn }).then((re) => {
            if (re.status === "OK") {
                // Show Success Modal
                // history.push("/social-profile/")
            } else {
                cogoToast.error(re.message, { position: "top-right", hideAfter: 5 })
            }
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            setLoading(false)
        });
    }

    return (
        <Fragment>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-12">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close fs-10 mt-2 me-3" data-bs-dismiss="modal" onClick={closeModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row px-lg-4 px-3">

                                <form onSubmit={submit}>
                                    <section hidden={step !== 0}>
                                        <p className="fw-600 ft-2 fs-16">Choose your bank from the list</p>
                                        <div className="input-group mb-1">
                                            <span className="input-group-text input-group-text-0 fs-22">
                                                <i className="iconly-Search icli fs-22 border-end-0"></i>
                                            </span>
                                            <input type="text" placeholder="Search available banks..." onChange={searchBanks} className="form-control form-control-0 ps-3 py-3 border-start-0" />
                                        </div>
                                        {(keyword !== "" && result.length > 0) && <label className="fs-12 ft-2 mb-3">Showing results for <span className="fw-bold">"{keyword}"</span></label>}

                                        {loading
                                            ?
                                            <div className="text-center">
                                                <p>Loading...</p>
                                            </div>
                                            : result.length > 0
                                                ?
                                                <Fragment>
                                                    <div className="card-radio mb-5">
                                                        <div className="row custom-radio-button-group">
                                                            {
                                                                result.map((v) => {
                                                                    return (
                                                                        <div className="col-lg-4 col-md-6 col-6 mb-2" key={v.id}>
                                                                            <input type="radio" className="custom-radio" id={v.id} name="bank" value={v.code} data-name={v.name} />
                                                                            <label className="custom-radio-button h-100" htmlFor={v.id}>
                                                                                <img src={`/img/brands/${v.code}.svg`} className="mb-2" onError={showDefault} height={80} width={80} alt={v.name} />
                                                                                <p className="fs-12">{v.name}</p>
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-12 text-end">
                                                            <button type="button" onClick={() => setCurrentStep(1)} className="btn btn-transparent text-theme p-0 fs-14 ft-2 fw-600 rounded-10">Continue</button>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                                : <div className="row text-center">
                                                    <div className="mb-4">
                                                        <img src="/img/no_result.svg" alt="No banks" height="200" width="200" />
                                                    </div>

                                                    <div className="mb-2">
                                                        <p className="fs-16 ft-2 fw-bold mb-1">No Result</p>
                                                        <p className="fs-12 ft-2">Your query didn't return any result.</p>
                                                    </div>
                                                </div>
                                        }
                                    </section>

                                    <section hidden={step !== 1}>
                                        <div className="col-12 mb-5">
                                            <div className="text-center mb-5">
                                                <p className="fs-22 fw-bold ft-2 mb-2">Enter your bank account number</p>
                                                <p className="fs-12 ft-2 mb-3">Enter the associated bank account number.</p>
                                            </div>

                                            <div className="input-group mb-1">
                                                <span className="input-group-text input-group-text-0 fs-22">#</span>
                                                <input onChange={shadowFetchNuban} type="text" pattern="^\d{10}$" placeholder="Account Number" title="Account number must contain 10 digits only" className="form-control form-control-0 ps-3 py-3 border-start-0" name="account" required />
                                            </div>
                                            <p className="fs-12 ft-2">Account Name: <span className="fw-600">{accountName}</span></p>
                                        </div>
                                        <div className="text-center mb-3">
                                            <button type="button" onClick={() => setCurrentStep(0)} className="btn btn-transparent text-muted ft-2 fw-600 fs-14 px-4"><i className="fa fa-chevron-left fs-12"></i> &nbsp;Back</button>
                                            <button type={merchant?.isBVNValidated ? "submit" : "button"} onClick={merchant?.isBVNValidated ? undefined : () => setCurrentStep(2)} className="btn btn-transparent text-theme ft-2 fw-600 fs-14 rounded-10">Continue</button>
                                        </div>
                                    </section>

                                    {!merchant?.isBVNValidated &&
                                        <section hidden={step !== 2}>
                                            <div className="col-12 mb-3">

                                                <div className="text-center mb-5">
                                                    <p className="fs-22 fw-bold ft-2 mb-2">We'll need Additional Information</p>
                                                    <p className="fs-12 ft-2 mb-3">We'll require some additional information to complete your request. We'll only do this once</p>
                                                    <p className="fs-12 ft-2 mb-4"><abbr title="We only use this to confirm your personal information matches. We'll only request this one time">Why do we need this ?</abbr></p>
                                                </div>

                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="inputfirstName" className="form-label">Bank Verification Number (BVN)</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text input-group-text-0 fs-22"><i className="iconly-Shield-Done icli fs-22 border-end-0"></i></span>
                                                            <input type="text" pattern="^\d{11}$" placeholder="*** *** *** **" title="BVN must contain 9 digits only" className="form-control form-control-0 ps-3 py-3 border-start-0" name="bvn" required />
                                                        </div>
                                                    </div>
                                                    <div className="col mb-3">
                                                        <label htmlFor="inputfirstName" className="form-label">Date Of Birth</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text input-group-text-0 fs-22"><i className="iconly-Calendar icli fs-22 border-end-0"></i></span>
                                                            <DatePicker
                                                                placeholderText="Date of Birth (DD / MM / YYYY)"
                                                                maxDate={maxDate} className="form-control rounded-left-0 form-control-0 ps-3 py-3 border-start-0"
                                                                onChange={(date) => setEndDate(date)}
                                                                selected={endDate}
                                                                dateFormat="dd/MM/yyyy"
                                                                withPortal
                                                                isClearable
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"

                                                            >
                                                                <div className="text-center mb-2 fs-14 fw-bold">Choose your Date of Birth (DD/MM/YYYY)</div>
                                                            </DatePicker>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-center mb-3">
                                            <button type="button" onClick={() => setCurrentStep(1)} className="btn btn-transparent text-muted ft-2 fw-600 fs-14 px-4"><i className="fa fa-chevron-left fs-12"></i> &nbsp;Back</button>
                                                <button className="btn text-theme btn-transparent ft-2 fs-14 fw-600">Continue</button>
                                            </div>
                                        </section>
                                    }

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
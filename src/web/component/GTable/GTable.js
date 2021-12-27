import DataTable from 'datatables.net';
import 'datatables.net-responsive-dt';
import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';

export default function GTable({ data, class: _Class, searchEl, history }) {
    const dt = useRef(null);
    const searchInstace = searchEl && searchEl.current;

    function handleClick(ev) {
        ev.preventDefault();
        const { pathname } = history?.location;
        const { cell } = ev?.target?.tagName === "A" ? ev?.target?.dataset : ev?.target?.parentElement?.dataset;

        history.push({
            pathname: `${pathname.charAt(pathname.length - 1) === "/" ? pathname : pathname + "/"}${cell.charAt(cell.length - 1) === "/" ? cell : cell + "/"}`,
            state: {
                data: data && data.length && data.find(v => v.id.toString() === cell.toString())
            }
        })
    }

    useEffect(() => {
        const instance = dt.current && new DataTable(dt.current, {
            dom: 'tr<"row justify-content-end"<"col-lg-6 mt-4"<"d-flex justify-content-between"<"fs-14 align-self-center"l><"fs-14 align-self-center"i>p>>>',
            pagingType: "simple",
            responsive: true,
            autoWidth: true,
            language: {
                lengthMenu: "Rows per page _MENU_",
                paginate: {
                    next: '<i class="fa-solid fa-chevron-right"></i>', // or '&#8594'
                    previous: '<i class="fa-solid fa-chevron-left"></i>' // or '&#8592;' 
                }
            },
            data: data
                && data.length
                && data.map((v) => new _Class(v)),
            columns: _Class.getColumns,
            columnDefs: [
                {
                    targets: [-1], createdCell: function (td, cellData) {
                        td.classList.add("text-center", "fs-14", "py-3");
                        return ReactDOM.render(<a href={cellData} data-cell={cellData} onClick={handleClick}><i className="fa-solid fa-eye"></i> </a>, td)
                    }
                },
                {
                    targets: '_all',
                    createdCell: function (td, cellData, rowData, row, col) {
                        td.classList.add("text-center", "fs-14", "py-3", "text-capitalize", "ft-2");
                    }
                },
                { type: "status", targets: 4 },
                // { targets: [-1, -2], className: 'dt-body-right' }
            ],
            fnInfoCallback: function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
                return iStart + " - " + iEnd + " of " + iMax;
            }
        });
        instance.columns().header().to$().addClass("fw-bold fs-12 text-center text-uppercase py-3 ft-2")

        function search() {
            instance.search(this.value).draw();
        }
        if (searchInstace) searchInstace.addEventListener('keyup', search)

        return (() => {
            if (searchInstace) searchInstace.removeEventListener('keyup', search);
            instance.destroy();
        })
    });

    return (
        <table ref={dt} className="row-border nowrap hover w-100">
            <thead className="tb-header"></thead>
            <tbody className="border-custom"></tbody>
        </table>
    )

}

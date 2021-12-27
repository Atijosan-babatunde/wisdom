import { Fragment, useRef } from "react";

export default function PasswordStrengthField({ onClick, toggleDisplay, ...props }) {
    const inputRef  = useRef(null);

    const handleKeyup = () => {
		const indicator = document.querySelector(".indicator");
		const input = inputRef.current; //document.querySelector("#PPP");
		const weak = document.querySelector(".weak");
		const medium = document.querySelector(".medium");
		const strong = document.querySelector(".strong");
		const text = document.querySelector(".indicator-text");
		let regExpWeak = /[a-z]/;
		let regExpMedium = /\d+/;
		let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
		let no = 0;

		if (input.value !== "") {
			indicator.style.display = "block";
			indicator.style.display = "flex";
			if (input.value.length <= 3 && (input.value.match(regExpWeak) || input.value.match(regExpMedium) || input.value.match(regExpStrong))) no = 1;
			if (input.value.length >= 6 && ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) || (input.value.match(regExpMedium) && input.value.match(regExpStrong)) || (input.value.match(regExpWeak) && input.value.match(regExpStrong)))) no = 2;
			if (input.value.length >= 6 && input.value.match(regExpWeak) && input.value.match(regExpMedium) && input.value.match(regExpStrong)) no = 3;
			if (no === 1) {
				weak.classList.add("active");
				text.style.display = "block";
				text.textContent = "Your password is too week";
				text.classList.add("weak");
			}
			if (no === 2) {
				medium.classList.add("active");
				text.textContent = "Your password is medium";
				text.classList.add("medium");
			} else {
				medium.classList.remove("active");
				text.classList.remove("medium");
			}
			if (no === 3) {
				weak.classList.add("active");
				medium.classList.add("active");
				strong.classList.add("active");
				text.textContent = "Your password is strong";
				text.classList.add("strong");
			} else {
				strong.classList.remove("active");
				text.classList.remove("strong");
			}
		} else {
			indicator.style.display = "none";
			text.style.display = "none";
		}
	}

    return (
        <Fragment>
            <div className="input-group">
                <span className="input-group-text input-group-text-0 border-end-0"><i className="iconly-Lock icli fs-22"></i></span>
                <input ref={inputRef} onKeyUp={handleKeyup} type={toggleDisplay ? "text" : "password"}  {...props} />
                <button type="button" onClick={onClick} className="input-group-text input-group-text-0 border-start-0 fs-12">
                    {toggleDisplay ? "HIDE" : "SHOW"}
                </button>
            </div>
            <div className="indicator">
                <span className="weak"></span>
                <span className="medium"></span>
                <span className="strong"></span>
            </div>
            <div className="indicator-text fs-12"></div>
        </Fragment>
    )
}
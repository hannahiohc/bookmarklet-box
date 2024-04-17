import React, { useRef } from 'react';
import './style.css'

const List = ({ data, handleCheckbox }) => {
	const checkboxRef = useRef(null);

	const handleClick = (e) => {
		e.preventDefault();
		if (checkboxRef.current) {
			checkboxRef.current.click();
		}
	}

	return (
		<React.Fragment>
			<li>
				<div onClick={handleClick} dangerouslySetInnerHTML={{ __html:
					`<h2>${data.name}</h2>
					<p>${data.description}
						${data.version ? `<span class="version">Last updated on ${data.version}</span>` : ''}
					</p>
					<a class=“${data.classname}” href=${data.url}>${data.name}</a>` }}>
				</div> 
				<label className="checkbox-container">
					<input ref={checkboxRef} type="checkbox" name="checkbox" value={data.name} onChange={() => handleCheckbox(data)} />
					<span className="checkmark" />
				</label>
			</li>
		</React.Fragment>
	);
};

export default List;
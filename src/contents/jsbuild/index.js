import React, { useState, useEffect, useRef } from 'react';
import UglifyJS from 'uglify-js-export';
import './style.css'

const JSbuild = () => {
	const [result, setResult] = useState('');
	const [content, setContent] = useState('');
	const [copySuccess, setCopySuccess] = useState(false);
	const textAreaRef = useRef(null);

	useEffect(() => {
    	const code = content;
    	const minify = UglifyJS.minify(code);
    	setResult(`javascript:${encodeURI(minify.code)}`);
  	}, [content]); 

	const copyToClipboard = (copy) => {
		if (content.trim() === "") {
			alert("Textarea is empty ☹️");
		} else {
			textAreaRef.current.select();
			document.execCommand("copy");
			copy.target.focus();
			setCopySuccess(true);
			copy.target.classList.add("success");
		}
	}

	const runCode = () => {
		try {
			if (content !== '') {
				// eslint-disable-next-line no-new-func
				const func = new Function(content);
            	func();
			}
		} catch (error) {
			const runButton = document.querySelector(".run");
			runButton.textContent = "FIX YOUR CODE!";
		}
	}

	const handleTextarea = () => {
		setCopySuccess(false);
		const copyButton = document.querySelector(".copy");
		copyButton.classList.remove("success");

		const runButton = document.querySelector(".run");
    	runButton.textContent = "RUN CODE";
	}

	return (
		<section className="jsbuild content">
			<div className="buttons">
				<button 
					className="copy"
					onClick={copyToClipboard}>
					{copySuccess ? 'Copy Completed!' : 'Copy Code'}
				</button>
				<button 
					className="run"
					onClick={runCode}>
					Run Code
				</button>
			</div>
			<textarea className="your-js"
				onChange={e => {setContent(e.target.value); handleTextarea();}}
				placeholder="Minify할 JavaScript 코드를 넣어주세요."
			/>
			<textarea className="minified-js"
				value={result}
				readOnly
				ref={textAreaRef}
			/>
		</section>
	);
};

export default JSbuild;
import './style.css';

const Download = ({ selectedBookmarklets }) => {
    const downloadBookmarklets = () => {
        if (selectedBookmarklets.length > 0) {
            const bookmarkletContent = generateHTML(selectedBookmarklets);
            const element = document.createElement("a");
            const file = new Blob([bookmarkletContent], {type: 'text/html'});
            element.href = URL.createObjectURL(file);
            element.download = "js-bookmarklets.html";
            document.body.appendChild(element);
            element.click();
        } else {
            alert("Please select the bookmarklets you want to download.");
        }
    };

    const generateHTML = (bookmarklets) => {
        let htmlContent = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<Title>Bookmarks</Title>
    <H1>Bookmarks</H1>
    <DT><H3 FOLDED>Favorites</H3>
    <DL><p>
    <DT><H3 FOLDED>Bookmarklets</H3>
    <DL><p>
    `;
        bookmarklets.forEach((bookmarklet) => {
            htmlContent += `<DT><A HREF="${bookmarklet.url}">${bookmarklet.name}</A>
            `;
        });
        htmlContent += 
    `</DL><p>
</HTML>`;
        return htmlContent;
    };

    return (
        <>
            <button onClick={downloadBookmarklets} className="download-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.3" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>Download</span>
            </button>
        </>
    )
}

export default Download;
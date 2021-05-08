import React, { useState, useEffect } from "react"
import "./VideoPage.css"

function VideoPage() {
	return (
		<div className="Page">
	    <h1 className="tabtitle">
	    Video Viewer
	    </h1>
				   <div id="Video" className="iframe-container">
	            <iframe src="YOUR_LIVESTREAM_IP" title="Livestream"></iframe>
				   </div>
	    </div>
	)
}
export default VideoPage

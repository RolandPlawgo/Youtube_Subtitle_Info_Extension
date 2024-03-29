let apiKey = '';

setInterval(addSubtitleInfo, 1000);


let videosWithInfo = [];
function addSubtitleInfo()
{
    let metaDataElement = document.querySelectorAll('[id=meta]');
    metaDataElement.forEach(element => {
        if (element.querySelector('[id=metadata]') != null) {                   
            let videoLink = element.querySelector('[id=video-title-link]');
            if (!videosWithInfo.includes(videoLink.title)) {
                videosWithInfo.push(videoLink.title);

                let videoId = videoLink.href.replace("https://www.youtube.com/watch?v=", "");
                
                let url = 'https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=' + videoId + '&key=' + apiKey;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        let subtitleInfoText = '';
                        data.items.forEach(item => {
                            console.log(item.snippet.language);
                            subtitleInfoText += item.snippet.language;
                            if (item.snippet.trackKind == 'asr') {
                                subtitleInfoText += '[a] ';
                            } 
                            else {
                                subtitleInfoText += ' ';
                            }
                        });

                        let p = document.createElement('p');
                        p.style.color = '#de7c14';
                        p.innerText = subtitleInfoText;
                        p.style.fontSize = '1.4rem';
                        console.log(p.innerText);
                        p.classList.add('subtitle-info');
                        element.querySelector('[id=metadata]').appendChild(p);
                    });
            }
        }
    });
}
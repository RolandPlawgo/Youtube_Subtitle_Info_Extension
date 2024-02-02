let key = '';


setInterval(addSubtitleInfo, 1000);

function addSubtitleInfo()
{
    let metaDataElement = document.querySelectorAll('[id=meta]');
    metaDataElement.forEach(element => {
        if (element.querySelector('[id=metadata] .subtitle-info') == null) {
                if (element.querySelector('[id=metadata]') != null) {                   
                    
                    let videoLink = element.querySelector('[id=video-title-link]');
                    let videoId = videoLink.href.replace("https://www.youtube.com/watch?v=", "");
                 

                    let url = 'https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=' + videoId + '&key=' + key;
                    
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);

                            let subtitleInfoText = '';
                            data.items.forEach(item => {
                                console.log(item.snippet.language);
                                subtitleInfoText += item.snippet.language + ' ';
                                if (item.snippet.trackKind == 'asr') {
                                    subtitleInfoText += '[a]  ';
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
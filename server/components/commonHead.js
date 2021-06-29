const commonHead = `
<meta charset="UTF-8" lang="ko">
<link rel='stylesheet' href='/stylesheets/index.css'/>
<script src="/node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
<link href="/node_modules/material-components-web/dist/material-components-web.min.css" rel="stylesheet">
<script src="/node_modules/material-components-web/dist/material-components-web.min.js"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
<script>
	// 로케일 설정
    let locale = navigator.language.substr(0, 2)
    if (locale !== "ko")
        locale = "en"
    // 로케일에 맞게 미리 로드된 항목의 텍스트 수동 조정
    $(document).ready(() => {
    	if (locale === "ko") {
    		// 헤더
	        $("#tab_home").text("홈")
	        $("#tab_closet").text("옷장")
	        $("#tab_product").text("제품")
	        // 푸터
	        
    	}
    })
</script>
`

module.exports = commonHead
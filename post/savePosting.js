

/* 게시글을 입력받아'추천도서 검색' session storage에 저장하는 로직 */
// 간이 게시판


// '게시글 등록' button
// [update]전역변수는 오류를 발생시킬 가능성이있기에 함수안으로 넣어야할듯
var postBtn;

 
/* web browser에 웹 페이지가 로딩 시 동작하는 function */
function postEventListener(){
	postBtn = document.getElementById("postBtn");		// <input> post button의 dom객체의 참조값을 반환
	  
	postBtn.addEventListener("click",postBtnEL);		// function을 button의 이벤트 리스너등록 
} // postinit() END
 


// 게시글 등록 버튼 postBtn 클릭시 동작
function postBtnEL(){
	
	/* session storage의 잔여공간을 확인 */
	// 0번 : 게시글 정보의 key 값
	// 1-5번 : 게시글 정보 (최대 5개)	

	if(6>sessionStorage.getItem(0)){			// ***[update 필요함 = 현재 게시글이 6개까지 등록됨]
		
		// 입력 받은 게시글을 출력 (test용)//
		printPosting();
		
		// session storage에 저장
		post();
		
	}else{
		alert("게시글수의 한도에 도달했습니다. 관리자에게 문의하세요!^-^");
	}
/*
	// 입력 받은 게시글을 출력 (test용)//
	printPosting();
	
	// session storage에 저장
	post();
*/	

	
} // postBtnEL() END

  
/* 게시글 data를 session storage에 저장하는 function */
function post(){
    

	var bookNameDom = document.getElementById("bookName");
	var writerDom = document.getElementById("writer");
	var scoreDom = document.getElementById("score");
	var titleDom = document.getElementById("title");
    
	
	// 사용자가 입력한 게시글의data를 읽음
	// 1.메모리에 객체 할당 2.객체초기화 3.prototype에 링크연결 4.객체 주소반환
	var dto = new PostingDTO(bookName.value, writer.value, score.value, title.value);

	
	var add;		// key 값을 증가시키기 위한 변수
	
	
	
	/* 게시글 정보의 key 값 설정*/
	if(sessionStorage.getItem(0) == null){		// 웹 페이지가 최초 로드 시 key값(0번)을 1로 초기화
		sessionStorage.setItem(0, 1);
		console.log("조건1");
	}else{					
		add = 1 + parseInt(sessionStorage.getItem(0));			// 문자열 -> 숫자 명시적으로 변환함
		// [장기고민] sessionStorage.getItem(0)반환값의 타입이 문자열인 이유는??		
		
		sessionStorage.setItem(0, add)
		console.log("조건2");
	}

	key = sessionStorage.getItem(0);
	
	
	
	// session storage에 게시글 정보를 저장 (1번~5번)
	sessionStorage.setObj(key,dto);


	

	// test
	console.log("----------------------")
	console.log(sessionStorage.getItem(0));		// 게시글 정보의 key
	console.log(sessionStorage.getObj(1)); 
	console.log(sessionStorage.getObj(2));
	console.log(sessionStorage.getObj(3));
	console.log(sessionStorage.getObj(4));
	console.log(sessionStorage.getObj(5));
	console.log("----------------------")

	
	alert("게시글이 등록되었습니다.");
	
} // post() END



/* 게시글을 저장/관리기위한 객체 생성자 함수 */
// 보유 자원 : getter/setter/객체 (저장용)
function PostingDTO(bookName,writer,score,title){
	this.bookName = bookName;
	this.writer = writer;
	this.score = score;
	this.title = title;
	
	// [장기적 고민] but.. 멤버 method는 존재하지않다는 에러발생
	// 객체 멤버와 prototype 멤버 모두 저장 or 호출 불가
	// session storage에 저장하기 위해서  JQuery가 필요함
	this.getterBookName = function(){
		return this.bookName;
	}
} // PostingDTO() END


/* prototype(원형)객체 멤버 추가 */
// getter
// [장기적 고민] session storage에 저장하기 위해서  JQuery가 필요함
PostingDTO.prototype.getterBookName = function(){
	return this.bookName;
}



/* session storage 확장 */
// 임시저장소(local,session)에 객체를 저장하기 위해 prototype 객체 확장
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))		// JSON : JS의 텍스트 기반의 데이터 교환표준
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}







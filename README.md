CodeReviewMatchingPair
=======

# 만들게 된 계기
본인이 속한 팀에 팀장을 제외한(본인포함) 6명이 있다고 가정했을 시,
2명씩 코드리뷰 짝을 지어주기 위해 만들었다.

# 기술스택
실제 보여지는 페이지는 웹 페이지는 1개이므로, 간단히 자바스크립트만으로
서버 어플리케이션을 만들 수 있는 Node.js를 선택했다.

- OS : Ubuntu 12.04.4 LTS
- Platform : Node.js v0.10.28
- Web Framework : express@4.9.8
- View Template Engine : ejs@0.8.8
- Scheduler : node-schedule@0.1.13  
- DataBase : MYSQL 5.5.38
- Javascript Library : jQuery 2.1.1

# 사전 준비

DB 테이블 생성스크립트는 sql폴더밑에 두개의 파일을 실행하면 된다.

- member.sql : 회원정보 테이블 
- member_match_list.sql : 코드리뷰 매칭결과 테이블

# 결과보기

- local 실행시 : http://localhost:4000/users
- CodeReviewMatchingPair 프로젝트 실행결과 페이지 : http://bluepoet1004.cafe24.com:4000/users   

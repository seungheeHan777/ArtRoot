import wikipediaapi
import pymysql
from urllib.parse import unquote

# pip install wikipedia-api
# pip install pymysql
# MySQL 서버 연결 설정
connection = pymysql.connect(
    host="localhost",
    user="root",
    password="1111",
    database="db23208",
    cursorclass=pymysql.cursors.DictCursor
)

 # 학교 서버
# connection = pymysql.connect(
#    host= "localhost", 
#    port= 3306, 
#    user= "dbid232",
#    password= "dbpass232",
#    database= "db23208", 
#    cursorclass=pymysql.cursors.DictCursor
#  );
# 커서 생성
cursor = connection.cursor(pymysql.cursors.DictCursor)


# 언어 코드를 지정하여 Wikipedia 객체 생성
# 사용자 에이전트 설정
user_agent = "artroot"
wiki_html = wikipediaapi.Wikipedia(
    user_agent,
    language='ko',
    extract_format=wikipediaapi.ExtractFormat.HTML # html로 바꾸기
)

# 쿼리 실행
cursor.execute("SELECT name,detail FROM keyword")
# 결과 가져오기
result = cursor.fetchall()

# Wikipedia 페이지의 HTML을 가져오는 함수
def get_wikipedia(keyword):
    page = wiki_html.page(keyword)
    if page.exists():
        return page.text
    else:
        return None
    
for row in result:
    keyword=row['name']
    p_html_ko =get_wikipedia(keyword)
    if p_html_ko:
        # MySQL에 HTML 저장
        cursor.execute("UPDATE keyword SET detail = %s WHERE name = %s", (p_html_ko, keyword))
        connection.commit()

        print(f"{keyword} 페이지의 HTML을 MySQL에 저장했습니다.")
    # # 파일에 쓰기
    # file_path = f"C:/Users/ASUS/Desktop/{keyword}.html"  # 저장할 파일 경로 및 파일명
    # with open(file_path, "w", encoding="utf-8") as file:
    #     file.write(p_html_ko.text)
    # print(f"{keyword} 페이지를 {file_path}로 저장했습니다.")

# 연결 종료
cursor.close()
connection.close()
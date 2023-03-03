
from requests_html import HTMLSession


url="https://blog.openreplay.com/"

session = HTMLSession()

res=session.get(url)

res.html.render(sleep=2,scrolldown=3)

section = res.html.find('section',first=True)

card= section.find(".col-span-1")


for i in card:
    print(i.find(""))
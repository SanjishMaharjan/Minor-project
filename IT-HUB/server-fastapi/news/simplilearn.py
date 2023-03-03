
from requests_html import HTMLSession

def scrape_from_simplilearn():
    news=[]
    for p in range(1,3):
        url=f"https://www.simplilearn.com/resources/software-development/articles/page/{p}"

        session = HTMLSession()

        res=session.get(url)

        res.html.render(sleep=2,scrolldown=3)

        section = res.html.find('.card')


        for i in section:

            # link
            link = i.attrs.get("href")

            # for image
            image=i.find("img",first=True).attrs.get("src")

            # for title
            title= i.find("h4",first=True).text

            # for description
            description = i.find("p",first=True).text

            news.append({'link':link,'image':image,"title":title,'description':description})

    print("scrapped from simplilearn")
    return news

from requests_html import HTMLSession


def scrape_from_stack_overflow():
    news=[]

    for n in range(2,4):
        url =f"https://stackoverflow.blog/page/{n}/"

        session = HTMLSession()

        res=session.get(url)

        res.html.render(sleep=3,scrolldown=2)

        section = res.html.find('article')




        for i in section:
            title=i.find("h2",first=True).text
            link= i.find("a",first=True).attrs.get("href")
            image=i.find("img",first=True).attrs.get("src")
            description= i.find(".lh-excerpt",first=True).text
            news.append({'link':link,'image':image,"title":title,'description':description})


    print("scrapped from stackoverflow")
    return news

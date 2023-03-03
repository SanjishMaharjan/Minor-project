from requests_html import HTMLSession


def scrape_from_news_stack():
    session = HTMLSession()
    url="https://thenewstack.io/software-development/page/1"

    news=[]
    r= session.get(url)

    r.html.render(sleep=1,scrolldown=2)

    card = r.html.find('.more-stories-row',first=True)

    card= card.find(".col-25")


    for i in card:
        
        # link
        link = i.find("a",first=True).attrs.get("href")

        # image
        image= i.find("img",first=True).attrs.get("src")

        # title
        title=i.find(".post-title",first=True).text

        # description
        description=''

        news.append({'link':link,'image':image,"title":title,'description':description})

    print("scrapped from news_stack")
    return news





from requests_html import HTMLSession



def scrape_from_make_use_of():

    url = "https://www.makeuseof.com/category/programming/"


    session = HTMLSession()

    res=session.get(url)

    res.html.render(sleep=1,scrolldown=20)

    section = res.html.find('.section-latest-news',first=True)
    article = section.find("article")


    news=[]

    for i in article:

        # to find links
        link=i.find('a',first=True).absolute_links
        link = str(link)[2:-2]

        # to find title
        title = i.find('.bc-title-link',first=True).text

        # to find image
        image=i.find("source")[1].attrs.get("data-srcset")

        # to find description
        description=i.find(".bc-excerpt",first=True).text

        news.append({'link':link,'image':image,"title":title,'description':description})

    print("scrapped from make_use_of")
    return news




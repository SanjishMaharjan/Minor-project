from requests_html import HTMLSession


def scrape_from_dzone():

    news=[]


    for p in range(2,4):

        session = HTMLSession()
        url =f"https://dzone.com/coding/{p}"
        res=session.get(url)

        res.html.render(sleep=3,scrolldown=2)



        section = res.html.find('.article-block',first=True)

        media = section.find(".media")
        for i in media:
            image=i.find("img",first=True).attrs.get('src')
            title=i.find("a",first=True).text
            description = i.find(".article-desc",first=True).text
            link=i.find("a",first=True).absolute_links
            link = str(link)[2:-2]
            news.append({'link':link,'image':image,"title":title,'description':description})
            

    print("scrapped from dzone")
    return news




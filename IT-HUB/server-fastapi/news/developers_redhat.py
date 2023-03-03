from requests_html import HTMLSession




def scrape_from_developers_redhat():
    base_url="https://developers.redhat.com/"

    news=[]


    for p in range(0,3):

        url =f"https://developers.redhat.com/blog/posts?type=article&product=All&topics=All&page={p}"
        session = HTMLSession()
        res=session.get(url)




        res.html.render(sleep=1,scrolldown=2)
        section = res.html.find('.rhd-c-card')

        for i in section:
            # for image
            image= i.find("img",first=True).attrs.get("src")
            image=base_url+image

            # for title
            title = i.find("a",first=True).text

            # for description
            description = i.find("p",first=True).text

            # for link
            link = i.find("a",first=True).absolute_links
            link=str(link)[2:-2]


            news.append({'link':link,'image':image,"title":title,'description':description})


    print("scrapped from developers_redhat")
    return news
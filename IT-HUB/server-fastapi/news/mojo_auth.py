from requests_html import HTMLSession



def scrape_from_mojo_auth():
    session = HTMLSession()
    news=[]
    url="https://mojoauth.com/blog"


    r= session.get(url)

    r.html.render(sleep=1,scrolldown=1)

    card = r.html.find('.card')
    # print(card)
    for i in card:
        div=i.find('div',first=True)

        # to find title
        h2 = div.find('h2',first=True)
        title=h2.text

        # to find image
        img = div.find('img',first=True)
        image=img.attrs.get("src")

        # to find links
        desc= div.find(".description",first=True)
        a=desc.find('a')[1]
        link=a.attrs.get("href")

        # to find description
        p = desc.find("p",first=True)
        description=p.text

        news.append({'link':link,'image':image,"title":title,'description':description})


    print("scrapped from mojo_auth")
    return news
import json 
import csv

with open("FinalDataCountry.json",'r',encoding="utf-8") as f:
    data=json.load(f)

newdata = []
for i in data:
    country_data = {
        "countryname":i["countryName"],
        "slug":i["slug"],
        "canonicalNames":i["canonicalNames"],
        "population":i["population"],
        "flightPrice":i["flightPrice"],
        "timeDifference":i["timeDifference"],
        "CurrencyRate":i["Currency"] + "," +i["CurrencyRate"],
        "developmentStatus":i["developmentStatus"],
        "visaType":i["visaType"]
    }

    newdata.append(country_data)

headers = list(newdata[0].keys())
with open('FinalDataCountry_akshat.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(newdata)

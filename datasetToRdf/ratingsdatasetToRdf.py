with open('rating.txt', encoding="utf8") as f:
    lines = f.readlines()
writingFile = open("allerating.ttl" , "w")
infolist = []
for line in lines:
    list = line
    list = list.split(',')
    movieId = list[1]
    rating = list[2]
    if movieId not in infolist:
        infolist.append(movieId)
        infolist.append(rating)
        infolist.append(1)
    else:
        # currentTotal = infolist[infolist.index(movieId)+1]
        # currentAmount = infolist[infolist.index(movieId)+2]
        # print(currentTotal)
        infolist[infolist.index(movieId)+1] = float(infolist[infolist.index(movieId)+1]) + float(rating)
        infolist[infolist.index(movieId)+2] = float(infolist[infolist.index(movieId)+2]) + float(1)

for i in range(0,len(infolist), 3):
    try:
        finalAverage = float(infolist[i+1]) / float(infolist[i+2])
        print("The movie id: " + str(infolist[i]) + " The average rating: " + str(finalAverage))
        writingFile.write('# http://example.com/movieont/id' + str(infolist[i]) + "\n")
        writingFile.write('ex:id' + str(infolist[i]) + ' rdf:type' ' owl:NamedIndividual , ex:movie ;' + "\n")
        writingFile.write("ex:has_rating" + ' "%s"^^xsd:nonNegativeInteger .' % (int(finalAverage)) + "\n")
    except:
        pass
writingFile.close()
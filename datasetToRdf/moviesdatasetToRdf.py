countAllMyLines = 0
countPassedLines = 0
import string
notAllowedString = string.punctuation
notAllowedString = notAllowedString.replace("_","")
skipper = "No"
with open('txtbestand.txt', encoding="utf8") as f:
    lines = f.readlines()
writingFile = open("movies.ttl" , "w")
def checkString(checkstring,notAllowedString):
    for c in notAllowedString:
        if c in checkstring:
            return(False)
    return(True)
for line in lines:
    countAllMyLines += 1
    list = line
    list = list.split(',')
    movie_id = list[0]
    movie = list[1].split(" (")[0].replace(" ", "_")
    if checkString(movie,notAllowedString) == True:
        try:
            countAllMyLines += 1
            year = list[1].split(" (")[1][0:4]
            try:
                year = int(year)
            except:
                year = int(0)
            listofgenres = ""
            if list[2] == "(no genres listed)\n":
                listofgenres = "ex:other"
            else:
                genres = list[2].split('|')
                for genre in genres:
                    if genre:
                        listofgenres += "ex:"+genre+" , "
                listofgenres = listofgenres[:-4]
            writingFile.write('# http://example.com/movieont/'+movie+"\n")
            writingFile.write('ex:'+movie+ ' rdf:type' ' owl:NamedIndividual , ex:movie ;'+"\n")
            writingFile.write("ex:has_movieId"+ ' ex:id%s' % (movie_id)+";\n" )
            writingFile.write("ex:has_year"+ ' "%s"^^xsd:nonNegativeInteger ;' % (year)+"\n")
            writingFile.write("ex:has_genre"+ " " +listofgenres+" .\n")
        except:
            countPassedLines +=1
            pass
print(countAllMyLines,countPassedLines)
writingFile.close()
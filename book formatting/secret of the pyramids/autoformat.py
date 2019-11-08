import re
file = open("secret-of-the-pyramids.txt","r",errors="ignore")
output = open("output.txt","w").close()
output = open("output.txt","w")
text = file.read()
pages = text.split("")
n = len(pages)
progress = 0
for p in pages:
  progress += 1
  
  if p != "":
    choices = []
    pg_number = re.match("^[0-9]+",p).group(0)
    text = str(p)
    try:
      choices = p[p.index("If you"):].split("If you ")
      text = p[:p.index("If you")]
    except:
      pass
      '''
      if "The End" not in text:
        choices = ["Next page, turn to page "+str(int(pg_number)+1)]
        text = str(p)
      else:
        choices = []
        text = str(p)
        '''
    text = re.match("^[0-9]+\n*(.+)_?",text,re.DOTALL)
    output.write("*"+pg_number+"\n")
    output.write("Page "+pg_number+"\n")
    #warp = re.match(".*Turn to page ([0-9]+).$",p)
    #if warp == None:
    #  warp = re.match(".*page ([0-9]+).$",p)
    warp = re.match(".*page ([0-9]+).*$",p,re.DOTALL)
    if warp != None and len(choices) == 0:
      choices = ["Next page, turn to page "+warp.group(1)]
    elif len(choices) == 0 and "The End" not in p:
      choices = ["Next page, turn to page "+str(int(pg_number)+1)]
    for c in choices:
      c = c.replace('\n',' ').replace("go on to page","turn to page")
      c = re.match("(.+), turn to page ([0-9]+)",c,re.DOTALL)
      if c != None:
        output.write("^"+c.group(1).replace(",","")+","+c.group(2)+"\n")
    if text == None:
      text = re.match("^[0-9]+\n*(.+)$",p,re.DOTALL)
    text = text.group(1)
    text = text.replace("_","")
    output.write(text+"\n")
    #break
  #print(progress/n*100)
output.write("\n*\n")

output.close()



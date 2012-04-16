#go through file
for line in open("index.html"):
	#find id
	elid = ""
	index_id = line.find(" id=\"")
	if index_id >= 0:
		index_id += 5
		while index_id < len(line)-1 and line[index_id] != "\"":
			elid += line[index_id]
			index_id += 1
	#find title
	eltitle = ""
	index_title = line.find(" title=\"")
	if index_title >= 0:
		index_title += 8
		while index_title < len(line)-1 and line[index_title] != "\"":
			eltitle += line[index_title]
			index_title += 1
	#end
	if elid and eltitle:
		print(elid+"="+eltitle)
	elif elid or eltitle:
		print()
		print("ERROR")
		print(elid+"="+eltitle)

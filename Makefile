
COMPILED = www
SSH_TARGET = "someone@somewhere:/my/website/"


all:


render:
	@echo " Rendering all markdowns"


publish:
	git add * && git commit -m "publish" && git push


sync: all
	rsync -avP -e ssh ${COMPILED} ${SSH_TARGET}


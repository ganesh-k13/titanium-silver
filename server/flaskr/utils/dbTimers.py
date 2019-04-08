import threading

from server.flaskr.models import modelHelpers

def endChallengeAfter(seconds,cID):
	t = threading.Timer(
					interval=seconds,
					function=modelHelpers.setChallengeStatusByID,
					kwargs={
						"ID":cID,
						"status":"FINISHED"}
				)
	t.start()
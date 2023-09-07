import requests
import json
import random
from random import randint

serverUrl = "http://192.168.1.22:3000"


class ContentGenerator():

    def GetChats(self):

        url = f"{serverUrl}/chats"
        res = requests.get(url)
        print(res)

        return res.json()
    
    def GetUsers(self) :

        url = f"{serverUrl}/users"
        res = requests.get(url)
        print(res)

        return res.json()


    def GetMessage(self):
        l1=['Python', 'Java', 'C++', 'JavaScript',"Mom","your","Demo","tf2","gordon freeman","vue","react"]
        l2=['Language', 'Code', 'Program', 'Syntax',"t-skirt","goverment","hat","motobike"]
        l3=["is easy.", "is difficult", "is hard", "is complex","suck!"]
        data1 = l1[randint(0,len(l1)-1)]
        data2 = l2[randint(0,len(l2)-1)]
        data3 = l3[randint(0,len(l3)-1)]

        return f"{data1} {data2} {data3}"


    def createRandomMessage(self,user_id,chat_id,content):

        data = {
            "user_id":user_id,
            "chat_id":chat_id,
            "content":content

        }
        res = requests.post(f"{serverUrl}/chat/addMessage",json=data)

        print(res)


    def startGenerate(self,count):

        chats = self.GetChats()
        users = self.GetUsers()

      

        users = self.GetUsers()


        for i in range(count):
            chat_id = random.choice(chats)['_id']
            user_id = random.choice(users)["_id"]
            content =  self.GetMessage()

            self.createRandomMessage(user_id,chat_id,content)



cg = ContentGenerator()

cg.startGenerate(20)

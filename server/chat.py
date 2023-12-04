from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains import LLMChain
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationChain
from langchain.memory import ConversationKGMemory
import os
import config
from langchain.memory import ConversationBufferMemory

os.environ["OPENAI_API_KEY"] = config.API_KEYS["OPENAI_API_KEY"]

def llm_advice(res):
    
    chat = ChatOpenAI(temperature=0.9) 
    template = """
    ### Instructions ### 

    [Example]
    Question: Can you give me some advice on my posture issues? I have maintained correct posture for 30 minutes, had neck issues for 10 minutes, shoulder issues for 15 minutes, and waist issues for 20 minutes.
    Answer: You are maintaining correct posture for a relatively short amount of time. To improve your neck, shoulder, and waist issues, I recommend regular stretching and appropriate exercises. Taking regular breaks, correcting your posture frequently, and engaging in exercises to strengthen your muscles would be beneficial.
    """
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template="""```
    human_template = f"```\nQuestion: Can you give me some advice on my posture?{text}
    Answer:"""
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])
    chatchain = LLMChain(llm=chat, prompt=chat_prompt)
    return chatchain.run(text=res)

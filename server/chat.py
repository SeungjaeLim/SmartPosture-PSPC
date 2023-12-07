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
    You are an orthopaedic surgeon. Based on the statistics about my study posture, please provide me with a brief diagnosis, the likely problem, and how you can correct it.
    Answers should be three sentences or less.
    ---
    """
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template="""```
    human_template = f"```\nQuestion: Can you give me some advice on my posture?{text}
    Answer:"""
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])
    print("run")
    chatchain = LLMChain(llm=chat, prompt=chat_prompt)
    return chatchain.run(text=res)

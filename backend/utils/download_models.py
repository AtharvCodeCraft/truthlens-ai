from transformers import AutoTokenizer, AutoModelForSequenceClassification
from sentence_transformers import SentenceTransformer

print("Downloading DistilBERT...")

tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")

print("Downloading BGE Embedding Model...")

embedding_model = SentenceTransformer("BAAI/bge-small-en-v1.5")

print("All models downloaded successfully!")
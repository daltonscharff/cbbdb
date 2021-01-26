from bs4 import BeautifulSoup
from typing import List
import re
import datetime
from process import fetch

class Earwolf():
  raw = fetch("https://www.earwolf.com/alleps-ajax.php?show=9")
  soup = BeautifulSoup(raw, "html.parser")
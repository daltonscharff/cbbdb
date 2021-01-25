from typing import List

class Character:
  id: int
  name: str
  guests: List[str]

  def __init__(self) -> None:
    pass

class Episode:
  id: int
  release_date: str
  number: float
  title: str
  guests: List[str]
  best_of: bool
  live: bool

  def __init__(self, id=None, release_date=None, number=None, title=None, guests=None, best_of=None, live=None) -> None:
    self.id = id
    self.release_date = release_date,
    self.number = number
    self.title = title
    self.guests = guests
    self.best_of = best_of
    self.live = live

class Guest:
  id: int
  name: str
  episodes: List[str]
  characters: List[str]

  def __init__(self) -> None:
    pass

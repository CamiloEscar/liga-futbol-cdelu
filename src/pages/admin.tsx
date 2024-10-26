import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminNavbar from '../components/AdminNavbar'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import mockData from '../data/mockData1era'
import { Team, Player, Match, News } from '../types'

export default function Admin() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [teams, setTeams] = useState<Team[]>(mockData.teams)
  const [players, setPlayers] = useState<Player[]>(mockData.players)
  const [matches, setMatches] = useState<Match[]>(mockData.matches)
  const [news, setNews] = useState<News[]>(mockData.news)
  const [newTeam, setNewTeam] = useState<Partial<Team>>({ 
    name: '', 
    shortName: '',
    points: 0,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    stadium: '',
    founded: '',
    logo: ''
  })
  const [newPlayer, setNewPlayer] = useState<Partial<Player>>({ 
    name: '', 
    teamId: '', 
    position: '', 
    number: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    nationality: '',
    age: 0
  })
  const [newMatch, setNewMatch] = useState<Partial<Match>>({ 
    homeTeam: '', 
    awayTeam: '', 
    date: '', 
    time: '', 
    venue: '',
    competition: '',
    matchday: 0,
    ticketPrice: '',
    referee: '',
    assistantReferee1: '',
    assistantReferee2: '',
    fourthOfficial: ''
  })
  const [newNews, setNewNews] = useState<Partial<News>>({ 
    title: '', 
    content: '', 
    category: '',
    author: '',
    tags: []
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const addTeam = () => {
    if (newTeam.name) {
      const addedTeam = mockData.utils.addTeam(newTeam as Team)
      setTeams([...teams, addedTeam])
      mockData.teams = [...teams, addedTeam]
      setNewTeam({ 
        name: '', 
        shortName: '',
        points: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        stadium: '',
        founded: '',
        logo: ''
      })
    }
  }

  const addPlayer = () => {
    if (newPlayer.name && newPlayer.teamId) {
      const addedPlayer = mockData.utils.addPlayer(newPlayer as Player)
      setPlayers([...players, addedPlayer])
      mockData.players = [...players, addedPlayer]
      setNewPlayer({ 
        name: '', 
        teamId: '', 
        position: '', 
        number: 0,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
        nationality: '',
        age: 0
      })
    }
  }

  const addMatch = () => {
    if (newMatch.homeTeam && newMatch.awayTeam && newMatch.date) {
      const addedMatch = mockData.utils.addMatch(newMatch as Match)
      setMatches([...matches, addedMatch])
      mockData.matches = [...matches, addedMatch]
      setNewMatch({ 
        homeTeam: '', 
        awayTeam: '', 
        date: '', 
        time: '', 
        venue: '',
        competition: '',
        matchday: 0,
        ticketPrice: '',
        referee: '',
        assistantReferee1: '',
        assistantReferee2: '',
        fourthOfficial: ''
      })
    }
  }

  const addNews = () => {
    if (newNews.title && newNews.content) {
      const addedNews = mockData.utils.addNews(newNews as News)
      setNews([...news, addedNews])
      mockData.news = [...news, addedNews]
      setNewNews({ 
        title: '', 
        content: '', 
        category: '',
        author: '',
        tags: []
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        <Tabs defaultValue="teams">
          <TabsList className="mb-4">
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle>Add New Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input
                      id="teamName"
                      value={newTeam.name}
                      onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="teamShortName">Short Name</Label>
                    <Input
                      id="teamShortName"
                      value={newTeam.shortName}
                      onChange={(e) => setNewTeam({ ...newTeam, shortName: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="teamStadium">Stadium</Label>
                    <Input
                      id="teamStadium"
                      value={newTeam.stadium}
                      onChange={(e) => setNewTeam({ ...newTeam, stadium: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="teamFounded">Founded</Label>
                    <Input
                      id="teamFounded"
                      value={newTeam.founded}
                      onChange={(e) => setNewTeam({ ...newTeam, founded: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="teamLogo">Logo URL</Label>
                    <Input
                      id="teamLogo"
                      value={newTeam.logo}
                      onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <Button onClick={addTeam}>Add Team</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Short Name</TableHead>
                      <TableHead>Stadium</TableHead>
                      <TableHead>Founded</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teams.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell>{team.name}</TableCell>
                        <TableCell>{team.shortName}</TableCell>
                        <TableCell>{team.stadium}</TableCell>
                        <TableCell>{team.founded}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="players">
            <Card>
              <CardHeader>
                <CardTitle>Add New Player</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playerName">Name</Label>
                    <Input
                      id="playerName"
                      value={newPlayer.name}
                      onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playerTeam">Team</Label>
                    <Select
                      onValueChange={(value) => setNewPlayer({ ...newPlayer, teamId: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playerPosition">Position</Label>
                    <Input
                      id="playerPosition"
                      value={newPlayer.position}
                      onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playerNumber">Number</Label>
                    <Input
                      id="playerNumber"
                      type="number"
                      value={newPlayer.number}
                      onChange={(e) => setNewPlayer({ ...newPlayer, number: parseInt(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playerNationality">Nationality</Label>
                    <Input
                      id="playerNationality"
                      value={newPlayer.nationality}
                      onChange={(e) => setNewPlayer({ ...newPlayer, nationality: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playerAge">Age</Label>
                    <Input
                      id="playerAge"
                      type="number"
                      value={newPlayer.age}
                      onChange={(e) => setNewPlayer({ ...newPlayer, age: parseInt(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <Button onClick={addPlayer}>Add Player</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Players</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Number</TableHead>
                      <TableHead>Nationality</TableHead>
                      <TableHead>Age</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.map((player) => (
                      <TableRow key={`${player.id}-${player.name}`}>
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{teams.find(t => t.id === player.teamId)?.name}</TableCell>
                        <TableCell>{player.position}</TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.nationality}</TableCell>
                        <TableCell>{player.age}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Add New Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="homeTeam">Home Team</Label>
                    <Select
                      onValueChange={(value) => setNewMatch({ ...newMatch, homeTeam: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select home team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="awayTeam">Away Team</Label>
                    <Select
                      onValueChange={(value) => setNewMatch({ ...newMatch, awayTeam: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select away team" />
                      
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="matchDate">Date</Label>
                    <Input
                      id="matchDate"
                      type="date"
                      value={newMatch.date}
                      onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="matchTime">Time</Label>
                    <Input
                      id="matchTime"
                      type="time"
                      value={newMatch.time}
                      onChange={(e) => setNewMatch({ ...newMatch, time: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="matchVenue">Venue</Label>
                    <Input
                      id="matchVenue"
                      value={newMatch.venue}
                      onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="matchCompetition">Competition</Label>
                    <Input
                      id="matchCompetition"
                      value={newMatch.competition}
                      onChange={(e) => setNewMatch({ ...newMatch, competition: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="matchday">Matchday</Label>
                    <Input
                      id="matchday"
                      type="number"
                      value={newMatch.matchday}
                      onChange={(e) => setNewMatch({ ...newMatch, matchday: parseInt(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ticketPrice">Ticket Price</Label>
                    <Input
                      id="ticketPrice"
                      value={newMatch.ticketPrice}
                      onChange={(e) => setNewMatch({ ...newMatch, ticketPrice: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="referee">Referee</Label>
                    <Input
                      id="referee"
                      value={newMatch.referee}
                      onChange={(e) => setNewMatch({ ...newMatch, referee: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <Button onClick={addMatch}>Add Match</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Home Team</TableHead>
                      <TableHead>Away Team</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Competition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>{teams.find(t => t.id === match.homeTeam)?.name}</TableCell>
                        <TableCell>{teams.find(t => t.id === match.awayTeam)?.name}</TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>{match.time}</TableCell>
                        <TableCell>{match.venue}</TableCell>
                        <TableCell>{match.competition}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle>Add News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newsTitle">Title</Label>
                    <Input
                      id="newsTitle"
                      value={newNews.title}
                      onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newsContent">Content</Label>
                    <Input
                      id="newsContent"
                      value={newNews.content}
                      onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newsCategory">Category</Label>
                    <Input
                      id="newsCategory"
                      value={newNews.category}
                      onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newsAuthor">Author</Label>
                    <Input
                      id="newsAuthor"
                      value={newNews.author}
                      onChange={(e) => setNewNews({ ...newNews, author: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newsTags">Tags (comma-separated)</Label>
                    <Input
                      id="newsTags"
                      value={newNews.tags?.join(', ')}
                      onChange={(e) => setNewNews({ ...newNews, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                      className="col-span-3"
                    />
                  </div>
                  <Button onClick={addNews}>Add News</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>News</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {news.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
package service

import "github.com/google/uuid"

func GetId() string {
	i, _ := uuid.NewRandom()
	return i.String()
}

var database = []SearchResult{
	{
		Id:    GetId(),
		Title: "My Little Pony - Hasbro",
		Body:  "Discover the world of My Little Pony and learn more about your favorite Pony characters, activities, and more. Visit the shop to find your favorite pony...",
		Link:  "https://mylittlepony.hasbro.com/en-us",
	},
	{
		Id:    GetId(),
		Title: "Gremlins - Wikipedia",
		Body:  "Gremlins is a 1984 American black comedy horror film directed by Joe Dante, written by Chris Columbus, and starring Zach Galligan, Phoebe Cates, Hoyt Axton, ...",
		Link:  "https://en.wikipedia.org/wiki/Gremlins",
	},
	{
		Id:    GetId(),
		Title: "Nerf - Hasbro",
		Body:  "This is Nerf Nation - explore all Nerf blasters and accessories including dart blasters, water blasters, and laser blasters! Play free online games for kids ..",
		Link:  "https://nerf.hasbro.com/en-us",
	},
	{
		Id:    GetId(),
		Title: "Zombieland (2009)",
		Body:  "A shy student trying to reach his family in Ohio, a gun-toting bruiser in search of the last Twinkie and a pair of sisters striving to get to an amusement ...",
		Link:  "https://www.imdb.com/Title/tt1156398/",
	},
	{
		Id:    GetId(),
		Title: "Zimbabwe",
		Body:  "Zimbabwe officially the Republic of Zimbabwe, is a landlocked country in Southern Africa, between the Zambezi and Limpopo Rivers, bordered by South Africa ...",
		Link:  "https://en.wikipedia.org/wiki/Zimbabwe",
	},
}

package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type SearchRequest struct {
	Query string `json:"query"`
}

type SearchResult struct {
	Id    string `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
	Link  string `json:"link"`
}

func GetResults(c *gin.Context) {

	out := make([]SearchResult, 0)
	q := strings.ToLower(c.Query("query"))

	for _, r := range database {
		if strings.Contains(strings.ToLower(r.Title), q) ||
			strings.Contains(strings.ToLower(r.Body), q) {
			out = append(out, r)
		}
	}
	resp, _ := json.Marshal(out)
	c.IndentedJSON(http.StatusOK, string(resp))
}

func AddResult(c *gin.Context) {
	var newResult SearchResult
	if err := c.ShouldBindJSON(&newResult); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	if len(newResult.Id) == 0 {
		newResult.Id = GetId()
	}

	database = append(database, newResult)

	resp, _ := json.Marshal(newResult)
	c.IndentedJSON(http.StatusOK, string(resp))
	// c.Set("Content-Type", "application/json")
	return
}

package main

import (
	"e2eweb/pkg/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/search", service.GetResults)
	router.POST("/api/db", service.AddResult)
	router.PATCH("/api/db", service.AddResult)

	router.Run("localhost:8088")
}

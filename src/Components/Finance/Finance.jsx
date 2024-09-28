import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logo from "./Interactive_Brokers1.png";
import logo1 from "./charles-schwab.png";
import logo2 from "./SAXO.png";
import logo3 from "./etoro.png";
import logo4 from "./exante.png";

// Sample data for multiple cards
const cardData = [
  {
    title: "Interactive Brokers",
    image: logo,
    description:
      "Availability: Available to residents in Mexico, Brazil, and India.\nKey Features: Low fees, global market access, and sophisticated trading tools.\nMarkets: Access to U.S. and international exchanges, including stocks, options, futures, forex, and bonds.\nRegulations: IBKR adheres to local regulations in these countries.",
    link: "https://www.interactivebrokers.com/en/home.php", // Add the URL here
  },
  {
    title: "Charles Schwab International",
    image: logo1, // You can replace this with a different image for the second card
    description:
      "Availability: Available to residents in Mexico and Brazil, but not available to residents of India.\nKey Features: No commission on U.S. stock trades, comprehensive customer support, and educational resources.\nMarkets: Primarily U.S. market access, but with limited international exchange options",
    link: "https://international.schwab.com/", // Add the URL for card 2
  },
  {
    title: "Saxo Bank",
    image: logo2, // You can replace this with a different image for the third card
    description:
      "Availability: Available to residents of Mexico, Brazil, and India.\nKey Features: A full-service brokerage with global access to equities, forex, and bonds.\nMarkets: Access to over 40,000 financial instruments across global markets, including stocks, options, and CFDs.",
    link: "https://www.home.saxo/", // Add the URL for card 3
  },
  {
    title: "eToro",
    image: logo3, // You can replace this with a different image for the third card
    description:
      "Availability: Available to residents in Mexico and Brazil, but not for residents of India.\nKey Features: Social trading, commission-free trading on stocks, and access to cryptocurrencies.\nMarkets: Primarily U.S. and European markets, along with crypto and commodities.",
    link: "https://www.etoro.com/en-us/", // Add the URL for card 3
  },
  {
    title: "Exante",
    image: logo4, // You can replace this with a different image for the third card
    description:
      "Availability: Available to residents of Mexico, Brazil, and India.\nKey Features: Access to multiple global exchanges, with a focus on low-cost, multi-asset trading.\nMarkets: Over 50 global exchanges, including stocks, bonds, options, and futures.",
    link: "https://exante.eu/", // Add the URL for card 3
  },
];

function Finance() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length
    );
  };

  const handleLearnMore = () => {
    window.open(cardData[currentIndex].link, "_blank"); // Opens the link in a new tab
  };

  return (
    <div style={{ textAlign: "center", padding: "5px" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center", // Horizontally centers the card
          alignItems: "center", // Vertically centers the card
          height: "70vh", // Adjusted height to leave space for the header
        }}
      >
        <Card
          sx={{
            width: "380px",
            height: "600px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // This will keep the image at the top and move the content and actions down
            background:
              "linear-gradient(180deg, #97ccee , rgba(0, 73, 119, 0.9) )",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            color: "white",
            padding: "20px",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)", // Makes text stand out
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: "white", // Keep this if it matches your theme
              fontFamily: "Noto Sans", // Ensure the font matches
              fontWeight: 600, // Match the font weight with Budgeting's BudgetHeader
              fontSize: "25px", // Set to the same font size as the BudgetHeader
              marginBottom: "10px",
              textAlign: "left",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Keep this if you want the text shadow
            }}
          >
            Investment Corner
          </Typography>

          <CardMedia
            component="img"
            sx={{
              width: "75%",
              height: "35%",
              objectFit: "contain",
              display: "block",
              margin: "0 auto", // Centers the image horizontally
              maxHeight: 200, // Adjust max height to avoid overflowing
              marginBottom: "10px",
            }}
            image={cardData[currentIndex].image}
            title={cardData[currentIndex].title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="white"
              fontWeight="bold"
              sx={{ fontFamily: "Noto Sans", marginBottom: "5px" }}
            >
              {cardData[currentIndex].title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                whiteSpace: "pre-line",
                fontFamily: "Noto Sans",
                fontWeight: 500,
              }}
            >
              {cardData[currentIndex].description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center", // Centers the buttons horizontally
              gap: 2, // Adds space between buttons
            }}
          >
            <Button
              size="small"
              onClick={handlePrev}
              sx={{
                border: "2px solid white",
                borderColor: "white",
                backgroundColor: "rgba(0, 73, 119, 0.9)",
                color: "white",
                fontFamily: "Noto Sans",
              }}
            >
              Previous
            </Button>
            <Button
              size="small"
              onClick={handleLearnMore}
              sx={{
                border: "2px solid white",
                borderColor: "white",
                backgroundColor: "rgba(0, 73, 119, 0.9)",
                color: "white",
              }}
            >
              Learn More
            </Button>
            <Button
              size="small"
              onClick={handleNext}
              sx={{
                border: "2px solid white",
                borderColor: "white",
                backgroundColor: "rgba(0, 73, 119, 0.9)",
                color: "white",
              }}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default Finance;

import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";

const ads = [
  {
    id: 1,
    title: "ساعة رولكس أصلية",
    city: "الرياض",
    price: "12,500 ريال",
  },
  {
    id: 2,
    title: "سيارة لكزس ES",
    city: "جدة",
    price: "145,000 ريال",
  },
  {
    id: 3,
    title: "فيلا للبيع",
    city: "الخبر",
    price: "2,350,000 ريال",
  },
  {
    id: 4,
    title: "جهاز MacBook Pro",
    city: "الدمام",
    price: "7,900 ريال",
  },
];

export default function Haraj() {
  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={1}
      >
        حراج أناقة CHIC
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        منصة احترافية للإعلانات المبوبة والبيع والشراء.
      </Typography>

      <Grid container spacing={3}>
        {ads.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card
              sx={{
                borderRadius: 4,
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{ mt: 1 }}
                  color="text.secondary"
                >
                  {item.city}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#b8860b",
                    fontWeight: "bold",
                  }}
                >
                  {item.price}
                </Typography>

                <Chip
                  label="إعلان موثق"
                  color="success"
                  sx={{ mt: 2 }}
                />

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
}
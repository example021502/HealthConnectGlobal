import { useContext, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { AuthContext } from "../Context/Context";
import { Chart, registerables } from "chart.js";
import { Weight } from "lucide-react";
Chart.register(...registerables);

function Analytics() {
  const { patients, specialists, view, userName } = useContext(AuthContext);
  const [dates, setDates] = useState({
    start: "",
    end: "",
  });
  const [nutrition_details, setNutritionDetails] = useState({
    calories: [],
    protein: [],
    carbohydrates: [],
    fats: [],
    sugar: [],
    water: [],
  });

  if (view === "specialist") {
    const specialist = specialists.find((sp) => {
      return (
        sp.first_name === userName.split(" ")[0] &&
        sp.last_name === userName.split(" ")[1]
      );
    });

    const meals = specialist.meals_data;

    Object.keys(meals).map((itemKey) => {
      if (itemKey === "nutrition_details") {
        setNutritionDetails({
          calories: meals[itemKey].calories,
          protein: meals[itemKey].protein,
          carbohydrates: meals[itemKey].carbohydrates,
          fats: meals[itemKey].fats,
          sugar: meals[itemKey].sugar,
          water: meals[itemKey].water,
        });
      }
    });
  }

  return (
    <div className="relative bottom-0 h-64 flex items-center justify-center ">
      <div className="absolute my-auto mx-auto flex flex-wrap w-40 items-center justify-center gap-3 transition-all ease-in-out duration-100">
        <p className="afterdisplayfats transition-all cursor-pointer duration-100 ease-in-out font-bold text-lg before:absolute relative before:right-[90%] before:bottom-[80%] before:rounded-full before:h-3 border-l-1 border-t-1 rounded-bl-2xl rounded-tr-2xl px-1.5 before:w-3 before:bg-[#9999cc] border-[#9999cc] hover:scale-105">
        Hello
        </p>
        <p className="afterdisplaycalories transition-all duration-100 ease-in-out font-bold text-lg before:absolute relative before:right-[90%] before:bottom-[80%] before:rounded-full before:h-3 border-l-1 border-t-1 rounded-bl-2xl rounded-tr-2xl px-1.5 before:w-3 before:bg-[#007ec6] border-[#007ec6] hover:scale-105">
          Hello
        </p>
        <p className="afterdisplayproteins transition-all duration-100 ease-in-out font-bold text-lg before:absolute relative before:right-[90%] before:bottom-[80%] before:rounded-full before:h-3 border-l-1 border-t-1 rounded-bl-2xl rounded-tr-2xl px-1.5 before:w-3 before:bg-[#f95d00] border-[#f95d00] hover:scale-105">
          Hello
        </p>
        <p className="afterdisplaycarbohydrates transition-all duration-100 ease-in-out font-bold text-lg before:absolute relative before:right-[90%] before:bottom-[80%] before:rounded-full before:h-3 border-l-1 border-t-1 rounded-bl-2xl rounded-tr-2xl px-1.5 before:w-3 before:bg-[#1CA71C] border-[#1CA71C] hover:scale-105">
          Hello
        </p>
      </div>
      <Doughnut
        className="p-2"
        key={"Analytics-chartj"}
        data={{
          labels: ["calories", "carbohydrates", "proteins", "fats"],
          datasets: [
            {
              label: "grams (g)",
              data: [1552, 1319, 613, 1400],
              backgroundColor: ["#007ec6", "#1CA71C", "#f95d00", "#9999cc"],
              borderWidth: 0,
              borderRadius: 8,
              hoverOffset: -10,
            },
          ],
        }}
        options={{
          maintainAspectRatio: true,
          cutout: "70%",
          plugins: {
            legend: {
              display: false,
            },
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontSize: 8,
              padding: 5,
            },
          },
        }}
      />
    </div>
  );
}

export default Analytics;

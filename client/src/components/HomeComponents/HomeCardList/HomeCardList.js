import accessoryPic from "../../../assets/accessories/leather-necklace.jpg";
import glasswarePic from "../../../assets/glassware/steph-drinking.jpg";
import teePic from "../../../assets/tees/tee-category.png";
import steph1 from "../../../assets/steph/steph-1.jpg";
import steph2 from "../../../assets/denim/denim-one-shot.jpg";
import tribalPic from "../../../assets/tribal-pic.png";
import HomeCard from "../../../components/HomeComponents/HomeCard/HomeCard";


const HomeCardList = () => {
  return (
    <>
      <HomeCard
        page="accessories"
        image={accessoryPic}
        // category="Accessories"
      />
      <HomeCard page="glassware" image={glasswarePic} category="Glassware" />
      <HomeCard
        style={{ objectPosition: "30%" }}
        page="tees"
        image={teePic}
        // category="Tees"
      />
      <HomeCard
        page="adams-apple-ascots"
        image={steph1}
        topText="Adam's Apple"
        bottomText="Ascots"
      />
      <HomeCard page="venomous-denim" image={steph2} topText="Venomous Denim" />
      <HomeCard
        page="manifest-N2-art"
        image={tribalPic}
        disabled={true}
        topText="Manifest N2 Art"
        bottomText="(Coming Soon)"
      />
    </>
  );
};

export default HomeCardList;

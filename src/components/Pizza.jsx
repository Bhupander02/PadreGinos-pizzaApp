export default function Pizza({ name, description, image }) {
  console.log("The image path is:", image);

  return (
    <div className="pizza">
      {/* <img src={`/pizzas/${props.image}`} alt={props.name} /> */}
      <img src={image} alt={name} loading="lazy" />
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}

const formatType = (type: string): string => {
  
  let color;

  switch(type) {
    case 'Feu': 
      color = 'bg-red-500';
      break;
    case 'Eau': 
      color = 'bg-blue-500';
      break;
    case 'Plante': 
      color = 'bg-green-500';
      break;
    case 'Insecte': 
      color = 'bg-lime-500';
      break;
    case 'Normal': 
      color = 'bg-gray-300';
      break;
    case 'Vol': 
      color = 'bg-blue-400';
      break;
    case 'Poison': 
      color = 'bg-purple-400';
      break;
    case 'Fee': 
      color = 'bg-pink-500';
      break;
    case 'Psy': 
      color = 'bg-purple-700';
      break;
    case 'Electrik': 
      color = 'bg-yellow-400';
      break;
    case 'Combat': 
      color = 'bg-orange-500';
      break;
    default:
      color = 'bg-gray-400';
      break;
  }

  return `${color}`;
} 

export default formatType;
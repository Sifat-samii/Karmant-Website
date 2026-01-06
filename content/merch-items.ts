export type MerchItem = {
  id: number
  name: string
  image: string
  description: string
  buyLink: string
  buttonText: string
}

export const merchItems: MerchItem[] = [
  {
    id: 1,
    name: 'Karmant Logo T-Shirt',
    image: '/images/merch/logo tshirt (1).png',
    description: 'Official Karmant logo t-shirt',
    buyLink: 'https://heavymetaltshirtbd.com/details?id=L8IEHG0C--W4RZD30Z23BH-HVKAU721RK0I',
    buttonText: 'Buy',
  },
  {
    id: 2,
    name: 'Riot In Uniform T-Shirt',
    image: '/images/merch/riot tshirt.png',
    description: 'Riot In Uniform EP t-shirt',
    buyLink: 'https://www.facebook.com/photo?fbid=2148578651956124&set=a.256618244485517',
    buttonText: 'Buy',
  },
  {
    id: 3,
    name: 'Riot In Uniform EP CD',
    image: '/images/merch/riot cd.png',
    description: 'Physical CD of the Riot In Uniform EP',
    buyLink: '#',
    buttonText: 'Pre Order',
  },
  {
    id: 4,
    name: 'Karmant Patches',
    image: '/images/merch/patch.png',
    description: 'Embroidered logo patches for your vest or bag',
    buyLink: '#',
    buttonText: 'Coming Soon',
  },
  {
    id: 5,
    name: 'Hack & Slash Beer',
    image: '/images/merch/beer bottle (1).png',
    description: 'Limited-run brew collaboration celebrating Hack & Slash',
    buyLink: '#',
    buttonText: 'Coming Soon',
  },
]

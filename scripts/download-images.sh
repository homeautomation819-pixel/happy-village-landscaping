#!/bin/bash
cd "$(dirname "$0")/../public/images" || exit 1
dl() { curl -s --max-time 60 -o "$2" "https://images.unsplash.com/$1?w=1600&q=75&fm=jpg" & }
dl photo-1600585154340-be6161a56a0c landscaping-north-york-hero.jpg
dl photo-1517935706615-2717063c2225 toronto-skyline-service-area.jpg
dl photo-1585320806297-9794b3e4eeae landscape-design-toronto.jpg
dl photo-1564013799919-ab600027ffc6 hardscaping-interlock-toronto.jpg
dl photo-1590682680695-43b964a3ae17 sod-installation-toronto.jpg
dl photo-1558904541-efa843a96f01 lawn-care-north-york.jpg
dl photo-1625246333195-78d9c38ad449 irrigation-systems-toronto.jpg
dl photo-1503387762-592deb58ef4e landscape-architecture-toronto.jpg
dl photo-1544984243-ec57ea16fe25 stone-cement-features-toronto.jpg
dl photo-1433086966358-54859d0ed716 waterscape-features-toronto.jpg
dl photo-1600607687920-4e2a09cf159d basement-finishing-toronto.jpg
dl photo-1589939705384-5185137a7f0f drywall-contractors-toronto.jpg
dl photo-1581858726788-75bc0f6a952d flooring-installation-toronto.jpg
dl photo-1556911220-bff31c812dba kitchen-bath-remodeling-toronto.jpg
dl photo-1562259949-e8e7689d7828 painting-services-toronto.jpg
dl photo-1486406146926-c627a92ad1ab commercial-landscape-design-toronto.jpg
dl photo-1603712725038-e9334ae8f39f commercial-property-maintenance-toronto.jpg
dl photo-1483664852095-d6cc6870702d snow-removal-north-york.jpg
dl photo-1570129477492-45c003edd2be landscaping-north-york.jpg
dl photo-1600596542815-ffad4c1539a9 landscaping-scarborough.jpg
dl photo-1580587771525-78b9dba3b914 landscaping-etobicoke.jpg
dl photo-1613490493576-7fde63acd811 landscaping-york-toronto.jpg
dl photo-1545324418-cc1a3fa10c00 landscaping-east-york.jpg
dl photo-1487958449943-2429e8be8625 landscaping-vaughan.jpg
dl photo-1497366216548-37526070297c landscaping-markham.jpg
dl photo-1521791136064-7986c2920216 about-happy-village-landscaping.jpg
dl photo-1416879595882-3373a0480b5b gallery-garden-soil-prep.jpg
dl photo-1466692476868-aef1dfb1e735 gallery-garden-planting.jpg
dl photo-1598902108854-10e335adac99 gallery-shade-garden.jpg
dl photo-1591857177580-dc82b9ac4e1e gallery-garden-beds.jpg
dl photo-1439066615861-d1af74d74000 gallery-backyard-water.jpg
dl photo-1470770841072-f978cf4d019e gallery-waterscape-pond.jpg
dl photo-1600489000022-c2086d79f9d4 gallery-kitchen-renovation.jpg
dl photo-1620626011761-996317b8d101 gallery-bathroom-renovation.jpg
dl photo-1552321554-5fefe8c9ef14 gallery-bathroom-plants.jpg
dl photo-1616486338812-3dadae4b4ace gallery-basement-living-room.jpg
dl photo-1618221195710-dd6b41faaea6 gallery-interior-renovation.jpg
dl photo-1500382017468-9049fed747ef blog-sod-cost-toronto.jpg
dl photo-1522708323590-d24dbb6b0267 blog-basement-cost-toronto.jpg
dl photo-1516431883659-655d41c09bf9 gallery-snow-removal-winter.jpg
dl photo-1548777123-e216912df7d8 gallery-snow-aerial.jpg
dl photo-1600607687939-ce8a6c25118c gallery-living-room-flooring.jpg
dl photo-1600210492486-724fe5c67fb0 gallery-interior-painting.jpg
dl photo-1560185007-cde436f6a4d0 gallery-dining-renovation.jpg
dl photo-1541888946425-d81bb19240f5 gallery-construction-crew.jpg
dl photo-1584622650111-993a426fbf0a gallery-bathroom-shower.jpg
dl photo-1556912167-f556f1f39fdf gallery-kitchen-island.jpg
wait
echo "done: $(ls -1 *.jpg | wc -l) files"

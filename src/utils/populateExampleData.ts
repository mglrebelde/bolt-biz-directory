import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, GeoPoint } from 'firebase/firestore';
import { Business, Review } from '../types';

const exampleBusinesses: Partial<Business>[] = [
  {
    name: "Хоолны Газар",
    category: "Ресторан",
    subcategory: "Монгол хоол",
    description: "Уламжлалт монгол хоол, орчин үеийн амт",
    address: "Сүхбаатар дүүрэг, 1-р хороо, Энх тайвны өргөн чөлөө 5",
    contactInfo: {
      phone: "7611-1234",
      email: "info@hooltszar.mn",
    },
    website: "https://hooltszar.mn",
    operatingHours: {
      "Monday": "10:00 AM - 10:00 PM",
      "Tuesday": "10:00 AM - 10:00 PM",
      "Wednesday": "10:00 AM - 10:00 PM",
      "Thursday": "10:00 AM - 10:00 PM",
      "Friday": "10:00 AM - 11:00 PM",
      "Saturday": "11:00 AM - 11:00 PM",
      "Sunday": "11:00 AM - 9:00 PM",
    },
    photos: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"],
    socialMedia: {
      facebook: "https://facebook.com/hooltszar",
      instagram: "https://instagram.com/hooltszar",
    },
    rating: 0,
    latitude: 47.9184,
    longitude: 106.9177,
    isSponsored: false,
    isFeatured: true,
    aimag: "Улаанбаатар",
    soum: "Сүхбаатар дүүрэг",
  },
  {
    name: "Гоо Сайхны Салон",
    category: "Гоо сайхан",
    subcategory: "Үсчин",
    description: "Таны гоо сайханд зориулсан бүх төрлийн үйлчилгээ",
    address: "Баянгол дүүрэг, 3-р хороо, Энхтайваны өргөн чөлөө 12",
    contactInfo: {
      phone: "7622-5678",
      email: "info@goosaihan.mn",
    },
    website: "https://goosaihan.mn",
    operatingHours: {
      "Monday": "9:00 AM - 8:00 PM",
      "Tuesday": "9:00 AM - 8:00 PM",
      "Wednesday": "9:00 AM - 8:00 PM",
      "Thursday": "9:00 AM - 8:00 PM",
      "Friday": "9:00 AM - 9:00 PM",
      "Saturday": "10:00 AM - 9:00 PM",
      "Sunday": "10:00 AM - 6:00 PM",
    },
    photos: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"],
    socialMedia: {
      facebook: "https://facebook.com/goosaihan",
      instagram: "https://instagram.com/goosaihan",
    },
    rating: 0,
    latitude: 47.9137,
    longitude: 106.9011,
    isSponsored: true,
    isFeatured: false,
    aimag: "Улаанбаатар",
    soum: "Баянгол дүүрэг",
  },
  {
    name: "Шүдний Эмнэлэг",
    category: "Эрүүл мэнд",
    subcategory: "Шүдний эмч",
    description: "Таны инээмсэглэлийг илүү гэрэлтүүлэх мэргэжлийн шүдний эмнэлэг",
    address: "Хан-Уул дүүрэг, 1-р хороо, Чингисийн өргөн чөлөө 17",
    contactInfo: {
      phone: "7633-9012",
      email: "info@shudniiemuulug.mn",
    },
    website: "https://shudniiemuulug.mn",
    operatingHours: {
      "Monday": "9:00 AM - 6:00 PM",
      "Tuesday": "9:00 AM - 6:00 PM",
      "Wednesday": "9:00 AM - 6:00 PM",
      "Thursday": "9:00 AM - 6:00 PM",
      "Friday": "9:00 AM - 6:00 PM",
      "Saturday": "10:00 AM - 3:00 PM",
      "Sunday": "Closed",
    },
    photos: ["https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"],
    socialMedia: {
      facebook: "https://facebook.com/shudniiemuulug",
    },
    rating: 0,
    latitude: 47.9021,
    longitude: 106.8845,
    isSponsored: false,
    isFeatured: true,
    aimag: "Улаанбаатар",
    soum: "Хан-Уул дүүрэг",
  },
  {
    name: "Номын Дэлгүүр",
    category: "Худалдаа",
    subcategory: "Ном",
    description: "Монгол болон гадаад хэл дээрх олон төрлийн ном",
    address: "Чингэлтэй дүүрэг, 4-р хороо, Бага тойруу 59",
    contactInfo: {
      phone: "7644-3456",
      email: "info@nomindelguur.mn",
    },
    website: "https://nomindelguur.mn",
    operatingHours: {
      "Monday": "10:00 AM - 8:00 PM",
      "Tuesday": "10:00 AM - 8:00 PM",
      "Wednesday": "10:00 AM - 8:00 PM",
      "Thursday": "10:00 AM - 8:00 PM",
      "Friday": "10:00 AM - 9:00 PM",
      "Saturday": "10:00 AM - 9:00 PM",
      "Sunday": "11:00 AM - 6:00 PM",
    },
    photos: ["https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1590&q=80"],
    socialMedia: {
      facebook: "https://facebook.com/nomindelguur",
      instagram: "https://instagram.com/nomindelguur",
    },
    rating: 0,
    latitude: 47.9198,
    longitude: 106.9154,
    isSponsored: false,
    isFeatured: false,
    aimag: "Улаанбаатар",
    soum: "Чингэлтэй дүүрэг",
  },
];

const exampleReviews: Partial<Review>[] = [
  {
    rating: 5,
    comment: "Маш амттай хоол, дотно үйлчилгээ. Заавал очиж үзэх хэрэгтэй!",
    userName: "Болд",
  },
  {
    rating: 4,
    comment: "Үсчин маш сайн ажилласан. Үнэ нь бага зэрэг өндөр байсан ч үр дүнд нь сэтгэл хангалуун байна.",
    userName: "Сарнай",
  },
  {
    rating: 5,
    comment: "Мэргэжлийн түвшин өндөртэй эмч нар. Тав тухтай орчин бүрдүүлсэн байна.",
    userName: "Бат-Эрдэнэ",
  },
  {
    rating: 4,
    comment: "Сонирхолтой номнуудын сонголт их байсан. Ажилчид туслахад бэлэн байсан.",
    userName: "Оюунчимэг",
  },
  {
    rating: 5,
    comment: "Хамгийн дуртай ресторан минь! Үйлчилгээ болон хоолны чанар үргэлж өндөр түвшинд байдаг.",
    userName: "Ганбаатар",
  },
  {
    rating: 3,
    comment: "Дундаж үйлчилгээтэй. Сайжруулах зүйлс их байна.",
    userName: "Нарансолонго",
  },
];

export const populateExampleData = async () => {
  try {
    const businessIds: string[] = [];

    // Add businesses
    for (const business of exampleBusinesses) {
      const docRef = await addDoc(collection(db, 'businesses'), {
        ...business,
        rating: 0,
        latitude: business.latitude,
        longitude: business.longitude,
      });
      businessIds.push(docRef.id);
    }
    
    // Add reviews
    for (let i = 0; i < exampleReviews.length; i++) {
      const review = exampleReviews[i];
      const businessId = businessIds[i % businessIds.length]; // Cycle through businesses
      await addDoc(collection(db, 'reviews'), {
        ...review,
        businessId,
        userId: `user${i + 1}`,
        createdAt: new Date(),
      });
    }

    // Update business ratings
    for (const businessId of businessIds) {
      const reviewsQuery = await getDocs(collection(db, 'reviews'));
      const businessReviews = reviewsQuery.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Review))
        .filter(review => review.businessId === businessId);

      if (businessReviews.length > 0) {
        const averageRating = businessReviews.reduce((sum, review) => sum + review.rating, 0) / businessReviews.length;
        await updateDoc(doc(db, 'businesses', businessId), { rating: averageRating });
      }
    }

    console.log("Example data populated successfully");
  } catch (error) {
    console.error("Error populating example data:", error);
  }
};
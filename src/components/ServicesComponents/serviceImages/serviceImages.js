import ascotPic from '../../../assets/ascot-placeholder.png';
import eventPic from '../../../assets/event-rental.jpg';
import hairAndMakeupPic from '../../../assets/hair-and-makeup.jpg';
import { makeupImportedPics } from '../makeupImportedPics';
import { eventsImportedPics } from '../eventsImportedPics';

export const serviceImagesObject = {
	ascotsImage: ascotPic,
	eventsImage: eventPic,
	hairAndMakeupImage: hairAndMakeupPic,
	ascotsGallery: [],
	eventsGallery: [...eventsImportedPics.slice(0, 10)],
	hairAndMakeupGallery: [...makeupImportedPics.slice(0, 10)],
};

export const ascotsTextObject = {
	paragraph1:
		'SexesByStephanie offers an exclusive custom one-of-a-kind Tie Wear line called Adams Apple Ascots. Adams Apple Ascots is a custom one-of-a-kind handcrafted Tie brooch pin that’s very distinctive, original and a combination of a bow tie, necktie, scarf and a Ascot all in one. This creation was created from the soul and love of diversity, uniqueness, boldness, style, flair and elegancefor the non-conformist individual who are very in-tune with their own unique style of fashion. Adams Apple Ascots is where lifestyle meets “Fashion On Edge”!',
	paragraph2: 'Don’t Be Ordinary Be Extraordinary Rock Adams Apple Ascots!',
	paragraph3:
		'Adams Apple Ascots has been worn by over 300 celebrities and has been featured in a few magazines, serveral advertisements, several commercials, several news stations and radio stations since its birth to the universe.',
};

export const eventsTextObject = {
	paragraph1:
		'Our SexesByStephanie Vision Production Team is ouur Rental Division of Company. We have a very nice variety to rentals for any special occasion from table cloths, chair covers, hanging flower boxes, candy cart(with varitey selection of canopy toppers & vinyl lettering for your theme), sashes & chair bands, custom center pieces, balloon arches, draping, etc. A lot of our rentals are custom made to fit your event specifically for you. We don’t just rent we create rentals. No matter what your occasion is, if we don’t have it we create it. Our lead designer has a passion for making a person’s fantasy come to fruition. She has 25 years of experience in the Fashion and Interior Design, Hair & Art Industry which creates our one stop shop. Our team is very talented and creative and loves to be challenged on creativity.',
	paragraph2: 'If You Can Envision It, We Can Manifest IT',
	paragraph3: 'Rent Your Vision...',
};

export const makeupTextObject = {
	paragraph1:
		'Sexes makeup artistry is an art in itself where makeup artistry meets the canvas to create a dream come true vision of how an elegant bride wants to look on her special day that will create lasting memories of a fairytale wedding. Our MUA Morgan Samone is the owner of MoodsByMorgan with 5 years of professional experience under her belt. MoodsByMorgan is a certified makeup and extension lash stylist that can create your fantasy look whether it’s basic, bold, natural or dramatic for your special day. Our team members usenothing less than the best professional products such as Mac, Morphia, Sephora, ColorPop & Ulta to help make your experience with us an exciting & positive one.',
	paragraph2: '',
	paragraph3: '',
};

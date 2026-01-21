

const crypto = require('crypto');


const TEXT_NORMALIZATION = {

    'away': 'Visitante',
    'home': 'Local',
    'third': 'Tercera',
    'retro': 'Retro',
    'kids': 'Niño',
    'goalkeeper': 'Portero',
    'gk': 'Portero',
    'training': 'Entrenamiento',
    'special': 'Especial',
    'anniversary': 'Aniversario',
    'classic': 'Clásica',

    'jersey': 'Camiseta',
    'shirt': 'Camiseta',
    'kit': 'Equipación',
    'player': 'Jugador',
    'fan': 'Aficionado'
};


// Normalización de nombres de equipos (filiales y variaciones → equipo principal)
const TEAM_NAME_NORMALIZATION = {
    // España - Filiales
    'barcelona b': 'FC Barcelona',
    'barcelona atletic': 'FC Barcelona',
    'barca b': 'FC Barcelona',
    'barca atletic': 'FC Barcelona',
    'real madrid castilla': 'Real Madrid',
    'castilla': 'Real Madrid',
    'atletico madrid b': 'Atlético Madrid',
    'villarreal b': 'Villarreal',
    'real sociedad b': 'Real Sociedad',
    'athletic bilbao b': 'Athletic Club',
    'bilbao athletic': 'Athletic Club',
    'sevilla atlético': 'Sevilla',
    'sevilla atletico': 'Sevilla',
    'valencia mestalla': 'Valencia',
    'betis deportivo': 'Real Betis',

    // Inglaterra - Variaciones
    'man utd': 'Manchester United',
    'man united': 'Manchester United',
    'united': 'Manchester United',
    'man city': 'Manchester City',
    'city': 'Manchester City',
    'spurs': 'Tottenham',
    'tottenham hotspur': 'Tottenham',
    'wolves': 'Wolverhampton',
    'palace': 'Crystal Palace',
    'villa': 'Aston Villa',

    // Italia - Variaciones
    'juve': 'Juventus',
    'inter': 'Inter de Milán',
    'inter milan': 'Inter de Milán',
    'internazionale': 'Inter de Milán',
    'milan': 'AC Milan',
    'ac milan': 'AC Milan',
    'hellas verona': 'Verona',

    // Alemania - Variaciones
    'bayern': 'Bayern Munich',
    'bayern munchen': 'Bayern Munich',
    'bayern münchen': 'Bayern Munich',
    'bvb': 'Borussia Dortmund',
    'dortmund': 'Borussia Dortmund',
    'gladbach': 'Borussia Mönchengladbach',
    'monchengladbach': 'Borussia Mönchengladbach',
    'leverkusen': 'Bayer Leverkusen',
    'leipzig': 'RB Leipzig',
    'rb leipzig': 'RB Leipzig',
    'hsv': 'Hamburgo',
    'hamburg': 'Hamburgo',
    'hamburger sv': 'Hamburgo',
    'werder': 'Werder Bremen',
    'bremen': 'Werder Bremen',
    'koln': 'FC Köln',
    'cologne': 'FC Köln',
    'fc koln': 'FC Köln',
    'hertha': 'Hertha Berlin',
    'hertha bsc': 'Hertha Berlin',

    // Francia - Variaciones
    'psg': 'Paris Saint-Germain',
    'paris': 'Paris Saint-Germain',
    'paris saint germain': 'Paris Saint-Germain',
    'om': 'Olympique Marseille',
    'marseille': 'Olympique Marseille',
    'ol': 'Olympique Lyon',
    'lyon': 'Olympique Lyon',

    // España - Variaciones adicionales
    'barca': 'FC Barcelona',
    'fc barcelona': 'FC Barcelona',
    'barcelona': 'FC Barcelona',
    'madrid': 'Real Madrid',
    'atletico': 'Atlético Madrid',
    'atlético': 'Atlético Madrid',
    'atletico madrid': 'Atlético Madrid',
    'atlético madrid': 'Atlético Madrid',
    'athletic': 'Athletic Club',
    'athletic bilbao': 'Athletic Club',
    'bilbao': 'Athletic Club',
    'sociedad': 'Real Sociedad',
    'betis': 'Real Betis',
    'depor': 'Deportivo',
    'deportivo la coruna': 'Deportivo',
    'celta': 'Celta de Vigo',
    'celta vigo': 'Celta de Vigo',
    'rayo': 'Rayo Vallecano',
    'sporting': 'Sporting Gijón',
    'sporting gijon': 'Sporting Gijón',
};


// Mapeo de categorías de Yupoo a ligas del sistema
const YUPOO_CATEGORY_TO_LEAGUE = {
    // Premier League
    'premier league': 'premier',
    'premier': 'premier',
    'english premier': 'premier',
    'epl': 'premier',
    'england': 'premier',
    'english league': 'premier',

    // La Liga
    'la liga': 'laliga',
    'laliga': 'laliga',
    'spanish league': 'laliga',
    'spain': 'laliga',
    'liga española': 'laliga',
    'liga espanola': 'laliga',

    // Serie A
    'serie a': 'seriea',
    'seriea': 'seriea',
    'italian league': 'seriea',
    'italy': 'seriea',
    'calcio': 'seriea',

    // Bundesliga
    'bundesliga': 'bundesliga',
    'german league': 'bundesliga',
    'germany': 'bundesliga',

    // Ligue 1
    'ligue 1': 'ligue1',
    'ligue1': 'ligue1',
    'french league': 'ligue1',
    'france': 'ligue1',

    // Brasileirao
    'brasileiro': 'brasileirao',
    'brasileirao': 'brasileirao',
    'brasileiro série a': 'brasileirao',
    'brasileiro serie a': 'brasileirao',
    'brazilian league': 'brasileirao',
    'brazil': 'brasileirao',

    // SAF (Argentina)
    'saf': 'saf',
    'superliga argentina': 'saf',
    'argentine league': 'saf',
    'argentina': 'saf',
    'liga argentina': 'saf',

    // Liga Árabe
    'saudi': 'ligaarabe',
    'saudi league': 'ligaarabe',
    'saudi pro league': 'ligaarabe',
    'arabian': 'ligaarabe',
    'arab league': 'ligaarabe',

    // Selecciones
    'national team': 'selecciones',
    'national teams': 'selecciones',
    'selecciones': 'selecciones',
    'seleccion': 'selecciones',
    'national': 'selecciones',
    'country': 'selecciones',
    'countries': 'selecciones',
    'world cup': 'selecciones',
    'euro': 'selecciones',
    'copa america': 'selecciones',

    // NBA
    'nba': 'nba',
    'basketball': 'nba',

    // Otras ligas
    'eredivisie': 'eredivisie',
    'dutch league': 'eredivisie',
    'netherlands': 'eredivisie',
    'holland': 'eredivisie',

    'liga portugal': 'ligaportugal',
    'portuguese league': 'ligaportugal',
    'portugal': 'ligaportugal',
    'primeira liga': 'ligaportugal',

    'scottish': 'scottish',
    'scotland': 'scottish',
    'spfl': 'scottish',

    'mls': 'MLS',
    'major league soccer': 'MLS',
    'usa soccer': 'MLS',
    // NO mapear 'major league' solo porque puede ser 'Major League / Liga MX'

    'liga mx': 'Liga MX',
    'mexican league': 'Liga MX',
    // NO mapear 'mexico' solo porque puede confundirse con la selección
};

// Equipos MLS (Estados Unidos y Canadá)
const MLS_TEAMS = [
    'la galaxy', 'galaxy', 'los angeles galaxy',
    'lafc', 'los angeles fc', 'la fc',
    'inter miami', 'miami',
    'new york red bulls', 'red bulls', 'nyrb',
    'new york city', 'nyc fc', 'nycfc',
    'seattle sounders', 'sounders', 'seattle',
    'atlanta united', 'atlanta',
    'portland timbers', 'timbers', 'portland',
    'philadelphia union', 'union', 'philadelphia',
    'dc united', 'dc',
    'chicago fire', 'fire', 'chicago',
    'columbus crew', 'crew', 'columbus',
    'houston dynamo', 'dynamo', 'houston',
    'fc dallas', 'dallas',
    'sporting kansas city', 'kansas city', 'skc',
    'colorado rapids', 'rapids', 'colorado',
    'san jose earthquakes', 'earthquakes', 'san jose',
    'orlando city', 'orlando',
    'minnesota united', 'minnesota',
    'nashville sc', 'nashville',
    'austin fc', 'austin',
    'charlotte fc', 'charlotte',
    'st louis city', 'st louis',
    'toronto fc', 'toronto',
    'cf montreal', 'montreal',
    'vancouver whitecaps', 'whitecaps', 'vancouver'
];

// Equipos Liga MX (México)
const LIGA_MX_TEAMS = [
    'america', 'club america', 'aguilas',
    'chivas', 'guadalajara', 'cd guadalajara',
    'cruz azul', 'la maquina',
    'pumas', 'pumas unam', 'unam',
    'tigres', 'tigres uanl', 'uanl',
    'monterrey', 'rayados',
    'santos laguna', 'santos',
    'leon', 'club leon',
    'toluca', 'deportivo toluca',
    'pachuca', 'tuzos',
    'atlas', 'atlas fc',
    'necaxa', 'rayos',
    'puebla', 'la franja',
    'tijuana', 'xolos', 'club tijuana',
    'queretaro', 'gallos',
    'mazatlan', 'mazatlan fc',
    'juarez', 'fc juarez', 'bravos',
    'san luis', 'atletico san luis'
];


// Función para detectar liga desde la categoría de Yupoo
function detectLeagueFromYupooCategory(categoryPath) {
    if (!categoryPath) return null;

    const normalized = categoryPath.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    // Si la categoría es combinada "Major League / Liga MX", retornar null
    // para que se use el nombre del equipo para determinar la liga
    if (normalized.includes('major league') && normalized.includes('liga mx')) {
        return null; // Será determinado por el nombre del equipo
    }

    // Buscar coincidencia en el diccionario
    for (const [key, league] of Object.entries(YUPOO_CATEGORY_TO_LEAGUE)) {
        if (normalized.includes(key)) {
            return league;
        }
    }

    return null;
}


// Función para detectar si es MLS o Liga MX por nombre de equipo
function detectMLSorLigaMX(teamName) {
    const teamLower = teamName.toLowerCase().trim();

    // Verificar si es equipo de MLS
    for (const mlsTeam of MLS_TEAMS) {
        if (teamLower.includes(mlsTeam) || mlsTeam.includes(teamLower)) {
            return 'MLS';
        }
    }

    // Verificar si es equipo de Liga MX
    for (const mxTeam of LIGA_MX_TEAMS) {
        if (teamLower.includes(mxTeam) || mxTeam.includes(teamLower)) {
            return 'Liga MX';
        }
    }

    return null;
}


const TEAM_TO_LEAGUE = {

    // La Liga y Segunda División - España
    'athletic': 'laliga',
    'athletic club': 'laliga',
    'athletic bilbao': 'laliga',
    'bilbao': 'laliga',
    'barcelona': 'laliga',
    'barca': 'laliga',
    'fc barcelona': 'laliga',
    'real madrid': 'laliga',
    'madrid': 'laliga',
    'atletico madrid': 'laliga',
    'atletico': 'laliga',
    'atlético madrid': 'laliga',
    'atlético': 'laliga',
    'sevilla': 'laliga',
    'valencia': 'laliga',
    'real sociedad': 'laliga',
    'sociedad': 'laliga',
    'betis': 'laliga',
    'real betis': 'laliga',
    'villarreal': 'laliga',
    'getafe': 'laliga',
    'osasuna': 'laliga',
    'celta': 'laliga',
    'celta vigo': 'laliga',
    'mallorca': 'laliga',
    'rayo': 'laliga',
    'rayo vallecano': 'laliga',
    'girona': 'laliga',
    'almeria': 'laliga',
    'cadiz': 'laliga',
    'alaves': 'laliga',
    'las palmas': 'laliga',
    'leganes': 'laliga',
    'espanyol': 'laliga',
    'valladolid': 'laliga',
    'granada': 'laliga',
    'elche': 'laliga',
    'levante': 'laliga',
    'oviedo': 'laliga',
    'real oviedo': 'laliga',
    'albacete': 'laliga',
    'malaga': 'laliga',
    'real murcia': 'laliga',
    'murcia': 'laliga',
    'deportivo': 'laliga',
    'deportivo la coruna': 'laliga',
    'depor': 'laliga',
    'racing santander': 'laliga',
    'zaragoza': 'laliga',
    'real zaragoza': 'laliga',
    // Segunda División España
    'tenerife': 'laliga',
    'cd tenerife': 'laliga',
    'sporting': 'laliga',
    'sporting gijon': 'laliga',
    'sporting gijón': 'laliga',
    'eibar': 'laliga',
    'huesca': 'laliga',
    'sd huesca': 'laliga',
    'racing': 'laliga',
    'numancia': 'laliga',
    'ponferradina': 'laliga',
    'sd ponferradina': 'laliga',
    'cartagena': 'laliga',
    'fc cartagena': 'laliga',
    'burgos': 'laliga',
    'burgos cf': 'laliga',
    'eldense': 'laliga',
    'cd eldense': 'laliga',
    'mirandes': 'laliga',
    'cd mirandes': 'laliga',
    'mirandés': 'laliga',
    'alcorcon': 'laliga',
    'ad alcorcon': 'laliga',
    'lugo': 'laliga',
    'cd lugo': 'laliga',
    'fuenlabrada': 'laliga',
    'cf fuenlabrada': 'laliga',
    'castellon': 'laliga',
    'cd castellon': 'laliga',
    'castellón': 'laliga',
    'ferrol': 'laliga',
    'racing ferrol': 'laliga',
    'andorra': 'laliga',
    'fc andorra': 'laliga',
    'amorebieta': 'laliga',
    'sd amorebieta': 'laliga',
    'villarreal b': 'laliga',
    'barcelona b': 'laliga',
    'barcelona atletic': 'laliga',
    'real madrid castilla': 'laliga',
    'castilla': 'laliga',
    'atletico madrid b': 'laliga',
    'hercules': 'laliga',
    'hércules': 'laliga',
    'recreativo': 'laliga',
    'recreativo huelva': 'laliga',
    'xerez': 'laliga',
    'cordoba': 'laliga',
    'córdoba': 'laliga',
    'cordoba cf': 'laliga',


    'arsenal': 'premier',

    'chelsea': 'premier',
    'liverpool': 'premier',
    'man united': 'premier',
    'manchester united': 'premier',
    'united': 'premier',
    'man city': 'premier',
    'manchester city': 'premier',
    'city': 'premier',
    'tottenham': 'premier',
    'spurs': 'premier',
    'newcastle': 'premier',
    'aston villa': 'premier',
    'villa': 'premier',
    'west ham': 'premier',
    'brighton': 'premier',
    'crystal palace': 'premier',
    'palace': 'premier',
    'fulham': 'premier',
    'brentford': 'premier',
    'nottingham': 'premier',
    'nottingham forest': 'premier',
    'wolves': 'premier',
    'wolverhampton': 'premier',
    'bournemouth': 'premier',
    'everton': 'premier',
    'leicester': 'premier',
    'ipswich': 'premier',
    'southampton': 'premier',
    // Championship - Inglaterra
    'leeds': 'premier',
    'leeds united': 'premier',
    'burnley': 'premier',
    'sheffield united': 'premier',
    'sheffield': 'premier',
    'sunderland': 'premier',
    'middlesbrough': 'premier',
    'watford': 'premier',
    'norwich': 'premier',
    'norwich city': 'premier',
    'coventry': 'premier',
    'coventry city': 'premier',
    'blackburn': 'premier',
    'blackburn rovers': 'premier',
    'stoke': 'premier',
    'stoke city': 'premier',
    'west brom': 'premier',
    'west bromwich': 'premier',
    'west bromwich albion': 'premier',
    'reading': 'premier',
    'cardiff': 'premier',
    'cardiff city': 'premier',
    'swansea': 'premier',
    'swansea city': 'premier',
    'millwall': 'premier',
    'qpr': 'premier',
    'queens park rangers': 'premier',
    'hull': 'premier',
    'hull city': 'premier',
    'bristol city': 'premier',
    'derby': 'premier',
    'derby county': 'premier',
    'bolton': 'premier',
    'bolton wanderers': 'premier',
    'portsmouth': 'premier',
    'birmingham': 'premier',
    'birmingham city': 'premier',
    'charlton': 'premier',
    'charlton athletic': 'premier',


    // Serie A - Italia
    'juventus': 'seriea',
    'juve': 'seriea',
    'inter': 'seriea',
    'inter milan': 'seriea',
    'internazionale': 'seriea',
    'milan': 'seriea',
    'ac milan': 'seriea',
    'napoli': 'seriea',
    'roma': 'seriea',
    'as roma': 'seriea',
    'lazio': 'seriea',
    'atalanta': 'seriea',
    'fiorentina': 'seriea',
    'torino': 'seriea',
    'bologna': 'seriea',
    'udinese': 'seriea',
    'sassuolo': 'seriea',
    'genoa': 'seriea',
    'sampdoria': 'seriea',
    'verona': 'seriea',
    'hellas verona': 'seriea',
    'parma': 'seriea',
    'como': 'seriea',
    'cagliari': 'seriea',
    'empoli': 'seriea',
    'lecce': 'seriea',
    'monza': 'seriea',
    'frosinone': 'seriea',
    'salernitana': 'seriea',
    'spezia': 'seriea',
    'venezia': 'seriea',
    'cremonese': 'seriea',
    'brescia': 'seriea',
    'palermo': 'seriea',
    'bari': 'seriea',


    'bayern': 'bundesliga',
    'bayern munich': 'bundesliga',
    'bayern munchen': 'bundesliga',
    'dortmund': 'bundesliga',
    'borussia dortmund': 'bundesliga',
    'bvb': 'bundesliga',
    'leverkusen': 'bundesliga',
    'bayer leverkusen': 'bundesliga',
    'leipzig': 'bundesliga',
    'rb leipzig': 'bundesliga',
    'frankfurt': 'bundesliga',
    'eintracht frankfurt': 'bundesliga',
    'wolfsburg': 'bundesliga',
    'schalke': 'bundesliga',
    'schalke 04': 'bundesliga',
    'monchengladbach': 'bundesliga',
    'gladbach': 'bundesliga',
    'borussia monchengladbach': 'bundesliga',
    'hoffenheim': 'bundesliga',
    'mainz': 'bundesliga',
    'mainz 05': 'bundesliga',
    'freiburg': 'bundesliga',
    'cologne': 'bundesliga',
    'koln': 'bundesliga',
    'fc koln': 'bundesliga',
    'union berlin': 'bundesliga',
    'stuttgart': 'bundesliga',
    'vfb stuttgart': 'bundesliga',
    'hertha': 'bundesliga',
    'hertha berlin': 'bundesliga',
    'hertha bsc': 'bundesliga',
    'hamburg': 'bundesliga',
    'hamburger': 'bundesliga',
    'hamburger sv': 'bundesliga',
    'hsv': 'bundesliga',
    'werder': 'bundesliga',
    'werder bremen': 'bundesliga',
    'bremen': 'bundesliga',
    'augsburg': 'bundesliga',
    'fc augsburg': 'bundesliga',
    'bochum': 'bundesliga',
    'vfl bochum': 'bundesliga',
    'heidenheim': 'bundesliga',
    'darmstadt': 'bundesliga',
    'darmstadt 98': 'bundesliga',
    'kaiserslautern': 'bundesliga',
    'fortuna dusseldorf': 'bundesliga',
    'dusseldorf': 'bundesliga',
    'nurnberg': 'bundesliga',
    'fc nurnberg': 'bundesliga',
    'hannover': 'bundesliga',
    'hannover 96': 'bundesliga',


    'psg': 'ligue1',
    'paris': 'ligue1',
    'paris saint-germain': 'ligue1',
    'paris saint germain': 'ligue1',
    'marseille': 'ligue1',
    'om': 'ligue1',
    'olympique marseille': 'ligue1',
    'monaco': 'ligue1',
    'as monaco': 'ligue1',
    'lyon': 'ligue1',
    'olympique lyon': 'ligue1',
    'ol': 'ligue1',
    'lille': 'ligue1',
    'nice': 'ligue1',
    'lens': 'ligue1',
    'rennes': 'ligue1',
    'strasbourg': 'ligue1',
    'nantes': 'ligue1',
    'toulouse': 'ligue1',
    'montpellier': 'ligue1',
    'reims': 'ligue1',
    'brest': 'ligue1',


    'flamengo': 'brasileirao',
    'palmeiras': 'brasileirao',
    'corinthians': 'brasileirao',
    'sao paulo': 'brasileirao',
    'santos': 'brasileirao',
    'gremio': 'brasileirao',
    'internacional': 'brasileirao',
    'fluminense': 'brasileirao',
    'botafogo': 'brasileirao',
    'athletico': 'brasileirao',
    'cruzeiro': 'brasileirao',
    'atletico mineiro': 'brasileirao',


    'boca': 'saf',
    'boca juniors': 'saf',
    'river': 'saf',
    'river plate': 'saf',
    'racing': 'saf',
    'independiente': 'saf',
    'san lorenzo': 'saf',
    'estudiantes': 'saf',


    'al-nassr': 'ligaarabe',
    'al nassr': 'ligaarabe',
    'al-hilal': 'ligaarabe',
    'al hilal': 'ligaarabe',
    'al-ittihad': 'ligaarabe',
    'al ittihad': 'ligaarabe',
    'al-ahli': 'ligaarabe',


    'spain': 'selecciones',
    'españa': 'selecciones',
    'france': 'selecciones',
    'francia': 'selecciones',
    'germany': 'selecciones',
    'alemania': 'selecciones',
    'england': 'selecciones',
    'inglaterra': 'selecciones',
    'italy': 'selecciones',
    'italia': 'selecciones',
    'portugal': 'selecciones',
    'brazil': 'selecciones',
    'brasil': 'selecciones',
    'argentina': 'selecciones',
    'netherlands': 'selecciones',
    'holanda': 'selecciones',
    'belgium': 'selecciones',
    'belgica': 'selecciones',
    'croatia': 'selecciones',
    'croacia': 'selecciones',
    'japan': 'selecciones',
    'japon': 'selecciones',
    'japón': 'selecciones',
    'korea': 'selecciones',
    'south korea': 'selecciones',
    'corea': 'selecciones',
    'mexico': 'selecciones',
    'méxico': 'selecciones',
    'usa': 'selecciones',
    'united states': 'selecciones',
    'eeuu': 'selecciones',
    'colombia': 'selecciones',
    'uruguay': 'selecciones',
    'chile': 'selecciones',
    'peru': 'selecciones',
    'perú': 'selecciones',
    'morocco': 'selecciones',
    'marruecos': 'selecciones',
    'senegal': 'selecciones',
    'nigeria': 'selecciones',
    'ghana': 'selecciones',
    'cameroon': 'selecciones',
    'camerún': 'selecciones',
    'egypt': 'selecciones',
    'egipto': 'selecciones',
    'australia': 'selecciones',
    'poland': 'selecciones',
    'polonia': 'selecciones',
    'denmark': 'selecciones',
    'dinamarca': 'selecciones',
    'sweden': 'selecciones',
    'suecia': 'selecciones',
    'norway': 'selecciones',
    'noruega': 'selecciones',
    'switzerland': 'selecciones',
    'suiza': 'selecciones',
    'austria': 'selecciones',
    'turkey': 'selecciones',
    'turquia': 'selecciones',
    'turquía': 'selecciones',
    'greece': 'selecciones',
    'grecia': 'selecciones',
    'serbia': 'selecciones',
    'ukraine': 'selecciones',
    'ucrania': 'selecciones',
    'czech': 'selecciones',
    'czech republic': 'selecciones',
    'chequia': 'selecciones',
    'scotland': 'selecciones',
    'escocia': 'selecciones',
    'wales': 'selecciones',
    'gales': 'selecciones',
    'ireland': 'selecciones',
    'irlanda': 'selecciones',


    'lakers': 'nba',
    'los angeles lakers': 'nba',
    'celtics': 'nba',
    'boston celtics': 'nba',
    'bulls': 'nba',
    'chicago bulls': 'nba',
    'warriors': 'nba',
    'golden state warriors': 'nba',
    'golden state': 'nba',
    'heat': 'nba',
    'miami heat': 'nba',
    'nets': 'nba',
    'brooklyn nets': 'nba',
    'knicks': 'nba',
    'new york knicks': 'nba',
    'clippers': 'nba',
    'la clippers': 'nba',
    'los angeles clippers': 'nba',
    'mavericks': 'nba',
    'dallas mavericks': 'nba',
    'suns': 'nba',
    'phoenix suns': 'nba',
    'bucks': 'nba',
    'milwaukee bucks': 'nba',
    '76ers': 'nba',
    'sixers': 'nba',
    'philadelphia 76ers': 'nba',
    'thunder': 'nba',
    'oklahoma': 'nba',
    'oklahoma city thunder': 'nba',
    'spurs': 'nba',
    'san antonio spurs': 'nba',
    'raptors': 'nba',
    'toronto raptors': 'nba',
    'rockets': 'nba',
    'houston rockets': 'nba',
    'nuggets': 'nba',
    'denver nuggets': 'nba',
    'timberwolves': 'nba',
    'minnesota timberwolves': 'nba',
    'grizzlies': 'nba',
    'memphis grizzlies': 'nba',
    'pelicans': 'nba',
    'new orleans pelicans': 'nba',
    'hawks': 'nba',
    'atlanta hawks': 'nba',
    'hornets': 'nba',
    'charlotte hornets': 'nba',
    'wizards': 'nba',
    'washington wizards': 'nba',
    'pacers': 'nba',
    'indiana pacers': 'nba',
    'pistons': 'nba',
    'detroit pistons': 'nba',
    'cavaliers': 'nba',
    'cleveland cavaliers': 'nba',
    'magic': 'nba',
    'orlando magic': 'nba',
    'jazz': 'nba',
    'utah jazz': 'nba',
    'kings': 'nba',
    'sacramento kings': 'nba',
    'trail blazers': 'nba',
    'blazers': 'nba',
    'portland trail blazers': 'nba',
    'lebron': 'nba',
    'curry': 'nba',
    'jordan': 'nba'
};


const EXCLUDED_IMAGE_KEYWORDS = [
    'qr',
    'qrcode',
    'whatsapp',
    'wechat',
    'weixin',
    'contact',
    'logo',
    'icon',
    'banner',
    'watermark',
    'payment',
    'shipping',
    'size-chart',
    'sizechart',
    'size_chart'
];


const EXCLUDED_URL_PATTERNS = [
    /whatsapp/i,
    /wechat/i,
    /weixin/i,
    /qr[-_]?code/i,
    /contact/i,
    /instagram/i,
    /facebook/i,
    /telegram/i,
    /\/icon/i,
    /\/logo/i,
    /size[-_]?chart/i
];






const TEAM_STOPWORDS = [
    'fc', 'cf', 'sc', 'ac', 'as', 'rc', 'cd', 'ud', 'rcd', 'sd', 'real',
    'club', 'sporting', 'deportivo', 'atletico', 'atlético', 'athletic',
    'united', 'city', 'town', 'rovers', 'wanderers',
    'local', 'visitante', 'tercera', 'cuarta', 'home', 'away', 'third', 'fourth',
    'retro', 'special', 'especial', 'edition', 'classic', 'vintage',
    'training', 'entrenamiento', 'portero', 'goalkeeper', 'gk',
    'kids', 'niño', 'niños', 'junior'
];


function normalizeForComparison(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}


// Normaliza el nombre del equipo usando el diccionario TEAM_NAME_NORMALIZATION
function normalizeTeamNameFromDictionary(teamName) {
    if (!teamName) return teamName;

    const normalized = normalizeForComparison(teamName);

    // Buscar coincidencia exacta primero
    if (TEAM_NAME_NORMALIZATION[normalized]) {
        return TEAM_NAME_NORMALIZATION[normalized];
    }

    // Buscar coincidencia parcial (el nombre contiene una clave del diccionario)
    for (const [key, value] of Object.entries(TEAM_NAME_NORMALIZATION)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return value;
        }
    }

    // Si no hay coincidencia, devolver el nombre original con formato capitalizado
    return teamName;
}


function extractTeamTokens(name) {
    const normalized = normalizeForComparison(name);
    const tokens = normalized.split(' ').filter(t => t.length > 1);


    return tokens.filter(t =>
        !TEAM_STOPWORDS.includes(t) &&
        !/^\d+$/.test(t) &&
        !/^\d{2}\/?\d{2}$/.test(t)
    );
}


function calculateTokenSimilarity(tokens1, tokens2) {
    if (tokens1.length === 0 || tokens2.length === 0) return 0;

    const set1 = new Set(tokens1);
    const set2 = new Set(tokens2);


    let exactMatches = 0;
    for (const t of set1) {
        if (set2.has(t)) exactMatches++;
    }


    let partialMatches = 0;
    for (const t1 of set1) {
        for (const t2 of set2) {
            if (t1 !== t2 && (t1.includes(t2) || t2.includes(t1))) {
                partialMatches += 0.5;
            }
        }
    }

    const totalMatches = exactMatches + partialMatches;
    const maxPossible = Math.max(set1.size, set2.size);

    return totalMatches / maxPossible;
}


class TeamMatcher {
    constructor(existingProducts = []) {
        this.products = existingProducts;
        this.teamIndex = new Map();
        this.buildIndex();
    }


    buildIndex() {
        const teamNames = new Set();


        this.products.forEach(p => {
            if (p.name) {

                const teamPart = p.name.replace(/\d{2}\/?\d{2}.*$/, '').trim();
                if (teamPart) teamNames.add(teamPart);
            }
        });


        teamNames.forEach(name => {
            const tokens = extractTeamTokens(name);
            tokens.forEach(token => {
                if (!this.teamIndex.has(token)) {
                    this.teamIndex.set(token, new Set());
                }
                this.teamIndex.get(token).add(name);
            });
        });
    }


    findBestMatch(newTeamName, threshold = 0.5) {
        const newTokens = extractTeamTokens(newTeamName);
        if (newTokens.length === 0) return null;


        const candidates = new Set();
        newTokens.forEach(token => {
            if (this.teamIndex.has(token)) {
                this.teamIndex.get(token).forEach(name => candidates.add(name));
            }

            this.teamIndex.forEach((names, indexToken) => {
                if (token.includes(indexToken) || indexToken.includes(token)) {
                    names.forEach(name => candidates.add(name));
                }
            });
        });

        if (candidates.size === 0) return null;


        let bestMatch = null;
        let bestScore = 0;

        candidates.forEach(candidateName => {
            const candidateTokens = extractTeamTokens(candidateName);
            const score = calculateTokenSimilarity(newTokens, candidateTokens);

            if (score > bestScore && score >= threshold) {
                bestScore = score;
                bestMatch = candidateName;
            }
        });

        if (!bestMatch) return null;


        const matchingProduct = this.products.find(p =>
            p.name && p.name.startsWith(bestMatch)
        );

        return {
            name: bestMatch,
            score: bestScore,
            league: matchingProduct?.league || null
        };
    }


    normalizeTeamName(newTeamName) {
        const match = this.findBestMatch(newTeamName, 0.6);

        if (match && match.score >= 0.8) {

            return {
                name: match.name,
                league: match.league,
                matched: true,
                score: match.score
            };
        }


        return {
            name: newTeamName,
            league: null,
            matched: false,
            score: 0
        };
    }
}


function loadExistingProducts(productsFilePath) {
    try {

        const content = fs.readFileSync(productsFilePath, 'utf-8');


        const match = content.match(/const\s+products\s*=\s*(\[[\s\S]*?\]);/);
        if (!match) {
            console.warn('⚠️  No se pudo parsear products-data.js');
            return [];
        }


        const products = eval(match[1]);
        return Array.isArray(products) ? products : [];
    } catch (err) {
        console.warn(`⚠️  Error cargando productos existentes: ${err.message}`);
        return [];
    }
}


function generateStableId(albumUrl) {

    const albumIdMatch = albumUrl.match(/albums\/(\d+)/);
    const albumId = albumIdMatch ? albumIdMatch[1] : albumUrl;


    const hash = crypto.createHash('sha256').update(albumId).digest('hex');


    const numericHash = parseInt(hash.substring(0, 8), 16);


    return 100000 + (numericHash % 900000);
}


function extractAlbumId(url) {
    const match = url.match(/albums\/(\d+)/);
    return match ? match[1] : null;
}


function generateSlug(name) {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}


function generateImageAlt(productName, imageIndex = 0) {
    if (imageIndex === 0) {
        return `${productName} - Vista principal`;
    }
    return `${productName} - Vista ${imageIndex + 1}`;
}


function normalizeText(text) {
    let normalized = text;


    for (const [english, spanish] of Object.entries(TEXT_NORMALIZATION)) {
        const regex = new RegExp(`\\b${english}\\b`, 'gi');
        normalized = normalized.replace(regex, spanish);
    }

    return normalized;
}


const TEAM_TRANSLATIONS = {

    'germany': 'Alemania',
    'deutschland': 'Alemania',
    'england': 'Inglaterra',
    'spain': 'España',
    'france': 'Francia',
    'italy': 'Italia',
    'portugal': 'Portugal',
    'netherlands': 'Holanda',
    'holland': 'Holanda',
    'belgium': 'Bélgica',
    'croatia': 'Croacia',
    'switzerland': 'Suiza',
    'austria': 'Austria',
    'poland': 'Polonia',
    'denmark': 'Dinamarca',
    'sweden': 'Suecia',
    'norway': 'Noruega',
    'finland': 'Finlandia',
    'greece': 'Grecia',
    'turkey': 'Turquía',
    'serbia': 'Serbia',
    'ukraine': 'Ucrania',
    'czech republic': 'República Checa',
    'czechia': 'Chequia',
    'russia': 'Rusia',
    'scotland': 'Escocia',
    'wales': 'Gales',
    'ireland': 'Irlanda',
    'hungary': 'Hungría',
    'romania': 'Rumania',
    'slovakia': 'Eslovaquia',
    'slovenia': 'Eslovenia',
    'iceland': 'Islandia',


    'brazil': 'Brasil',
    'argentina': 'Argentina',
    'mexico': 'México',
    'usa': 'Estados Unidos',
    'united states': 'Estados Unidos',
    'colombia': 'Colombia',
    'uruguay': 'Uruguay',
    'chile': 'Chile',
    'peru': 'Perú',
    'ecuador': 'Ecuador',
    'venezuela': 'Venezuela',
    'paraguay': 'Paraguay',
    'bolivia': 'Bolivia',
    'costa rica': 'Costa Rica',
    'panama': 'Panamá',
    'canada': 'Canadá',


    'morocco': 'Marruecos',
    'egypt': 'Egipto',
    'nigeria': 'Nigeria',
    'senegal': 'Senegal',
    'cameroon': 'Camerún',
    'ghana': 'Ghana',
    'ivory coast': 'Costa de Marfil',
    'cote divoire': 'Costa de Marfil',
    'tunisia': 'Túnez',
    'algeria': 'Argelia',
    'south africa': 'Sudáfrica',


    'japan': 'Japón',
    'south korea': 'Corea del Sur',
    'korea': 'Corea del Sur',
    'china': 'China',
    'saudi arabia': 'Arabia Saudita',
    'iran': 'Irán',
    'qatar': 'Qatar',
    'australia': 'Australia',


    'man utd': 'Manchester United',
    'man city': 'Manchester City',
    'spurs': 'Tottenham',
    'barca': 'FC Barcelona',
    'bayern': 'Bayern Munich',
    'juve': 'Juventus',
    'psg': 'PSG',
    'real': 'Real Madrid',
    'inter': 'Inter de Milán',
    'atletico': 'Atlético Madrid',
    'atlético': 'Atlético Madrid'
};


const TITLE_CLEANUP_PATTERNS = [

    /with\s+\w+\s+sponsor/gi,
    /with\s+\w+\s+sponosr/gi,
    /player\s+version/gi,
    /fans?\s+version/gi,
    /match\s+version/gi,
    /authentic\s+version/gi,
    /replica\s+version/gi,


    /black[\s-]?red(\s+line)?/gi,
    /white[\s-]?red(\s+line)?/gi,
    /blue[\s-]?white(\s+line)?/gi,
    /\b(Black|Gold|Blue|White|Pink|Red|Green|Yellow|Purple|Orange|Grey|Gray|Cyan|Navy)\b/gi,


    /\d+th\s+anniversary/gi,
    /\d+\s+anniversary/gi,
    /special\s+edition/gi,
    /limited\s+edition/gi,
    /commemorative/gi,
    /edici[oó]n\s+especial/gi,
    /edici[oó]n\s+limitada/gi,
    /aniversario/gi,


    /\(.*?\)/g,
    /\[.*?\]/g,


    /\b(Training|Entrenamiento|Pre-match|Warm-up|Prematch|Warmup)\b/gi,


    /\b(Vapor|Authentic|Fan|Elite|Match|Stadium|Player|Replica)\b/gi,


    /\b(Nike|Adidas|Puma|New Balance|Kappa|Umbro|Under Armour|Jordan)\b/gi,


    /\b(Size|Talla)\s*[:=]?\s*[XSMLxsml0-9-]+\b/gi,


    /\b[A-Z]{2,3}\d{4,}\b/gi,


    /\bv\d+\.?\d*\b/gi,


    /\b(AAA|AA|A)\s*quality/gi,
    /\bThai\s*quality/gi,
    /\b1:1\b/gi,
    /\bhigh\s*quality/gi,


    /\bjerseys?\b/gi,
    /\bshirts?\b/gi,
    /\bkits?\b/gi,
    /\bsoccer\b/gi,
    /\bfootball\b/gi,
    /\bbasketball\b/gi
];


function parseProductTitle(rawTitle) {

    let title = rawTitle.trim();


    title = title
        .replace(/&amp;amp;/gi, '&')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&nbsp;/gi, ' ');


    title = title.replace(/\s*&\s*/g, ' ');


    const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'pink', 'gold', 'golden',
        'purple', 'orange', 'grey', 'gray', 'navy', 'cyan', 'balck', 'bule', 'whit'];
    colors.forEach(color => {
        title = title.replace(new RegExp(`\\b${color}\\b`, 'gi'), '');
    });


    title = title.replace(/\s+/g, ' ').trim();

    const result = {
        raw: rawTitle,
        name: '',
        team: '',
        temporada: null,
        tipo: null,
        tallas: null,
        isKids: false,
        isRetro: false
    };





    const explicitSeasonMatch = title.match(/\b(\d{2})[\/\-](\d{2})\b/);

    const fullYearMatch = title.match(/\b(20\d{2})\b/);

    const gluedSeasonMatch = title.match(/\b(\d{2})(\d{2})\b(?!\d)/);

    if (explicitSeasonMatch) {

        const y1 = explicitSeasonMatch[1];
        const y2 = explicitSeasonMatch[2];
        result.temporada = `${y1}/${y2}`;
    } else if (fullYearMatch) {

        result.temporada = fullYearMatch[1];
    } else if (gluedSeasonMatch) {

        const y1 = gluedSeasonMatch[1];
        const y2 = gluedSeasonMatch[2];
        const n1 = parseInt(y1);
        const n2 = parseInt(y2);

        if (n2 > n1 || (n1 >= 90 && n2 < 10)) {
            result.temporada = `${y1}/${y2}`;
        }
    }


    if (!result.temporada && title.includes('25/26')) result.temporada = '25/26';
    if (!result.temporada && title.includes('24/25')) result.temporada = '24/25';



    const titleLower = title.toLowerCase();
    if (titleLower.includes('away') || titleLower.includes('visitante')) {
        result.tipo = 'visitante';
    } else if (titleLower.includes('third') || titleLower.includes('tercera')) {
        result.tipo = 'tercera';
    } else if (titleLower.includes('fourth') || titleLower.includes('cuarta')) {
        result.tipo = 'cuarta';
    } else if (titleLower.includes('home') || titleLower.includes('local')) {
        result.tipo = 'local';
    } else if (titleLower.includes('gk') || titleLower.includes('goalkeeper') || titleLower.includes('portero')) {
        result.tipo = 'portero';
    } else if (titleLower.includes('special') || titleLower.includes('especial') || titleLower.includes('edition')) {
        result.tipo = 'especial';
    } else if (titleLower.includes('training') || titleLower.includes('entrenamiento')) {
        result.tipo = 'entrenamiento';
    }


    const sizesMatch = title.match(/\b(S-\d?XL|S-4XL|XS-XXL|S-XXL|M-XXL|S-3XL)/i);
    if (sizesMatch) {
        result.tallas = sizesMatch[1].toUpperCase();
    }


    result.isKids = /\b(kids?|niños?|child|children|junior)\b/i.test(titleLower);


    result.isRetro = /\bretro\b/i.test(titleLower);


    let teamName = title;


    teamName = teamName
        .replace(/\b(20\d{2})\b/g, '')
        .replace(/(\d{2})[\/-]?(\d{2})\b/g, '')
        .replace(/\b(away|home|third|fourth|visitante|local|tercera|cuarta|gk|goalkeeper|portero)\b/gi, '')
        .replace(/\b(special|especial|edition|edici[oó]n)\b/gi, '')
        .replace(/\b(training|entrenamiento|pre-?match|warm-?up)\b/gi, '')
        .replace(/\b(retro|classic|vintage)\b/gi, '')
        .replace(/\b(kids?|niños?|child|children|junior)\b/gi, '')
        .replace(/\b(S-\d?XL|S-4XL|XS-XXL|S-XXL|M-XXL|S-3XL)\b/gi, '')
        .replace(/\b(jerseys?|shirts?|camisas?|camisetas?|kits?)\b/gi, '');


    TITLE_CLEANUP_PATTERNS.forEach(pattern => {
        teamName = teamName.replace(pattern, '');
    });


    teamName = teamName
        .replace(/\s+/g, ' ')
        .replace(/^\W+|\W+$/g, '')
        .trim();


    const lowerTeam = teamName.toLowerCase();
    if (TEAM_TRANSLATIONS[lowerTeam]) {
        teamName = TEAM_TRANSLATIONS[lowerTeam];
    } else {




        for (const [eng, esp] of Object.entries(TEAM_TRANSLATIONS)) {
            const regex = new RegExp(`\\b${eng}\\b`, 'yi');
            if (lowerTeam === eng) {
                teamName = esp;
                break;
            }
        }
    }

    // Aplicar normalización de nombres de equipos (filiales → equipo principal)
    teamName = normalizeTeamNameFromDictionary(teamName);

    result.team = teamName;



    let finalParts = [result.team];

    if (result.temporada) finalParts.push(result.temporada);

    if (result.tipo) {
        finalParts.push(result.tipo.charAt(0).toUpperCase() + result.tipo.slice(1));
    }

    if (result.isRetro) finalParts.push('Retro');
    if (result.isKids) finalParts.push('(Niño)');

    result.name = finalParts.join(' ');


    if (!result.name.trim()) result.name = result.raw;

    return result;
}


function detectLeague(teamName, isRetro = false, categoryPath = null) {

    // Primero intentar detectar desde la categoría de Yupoo (si está disponible)
    if (categoryPath) {
        const leagueFromCategory = detectLeagueFromYupooCategory(categoryPath);
        if (leagueFromCategory) {
            return leagueFromCategory;
        }
    }

    const teamLower = teamName.toLowerCase().trim();


    if (TEAM_TO_LEAGUE[teamLower]) {
        return TEAM_TO_LEAGUE[teamLower];
    }


    const SELECCIONES = [
        'alemania', 'inglaterra', 'españa', 'francia', 'italia', 'portugal',
        'holanda', 'bélgica', 'brasil', 'argentina', 'méxico', 'estados unidos',
        'japón', 'marruecos', 'croacia', 'suiza', 'uruguay', 'colombia',
        'corea del sur', 'nigeria', 'senegal', 'camerún', 'ghana', 'egipto',
        'túnez', 'argelia', 'costa de marfil', 'perú', 'chile', 'ecuador',
        'venezuela', 'paraguay', 'panamá', 'costa rica', 'canadá',
        'polonia', 'dinamarca', 'suecia', 'noruega', 'austria', 'turquía',
        'grecia', 'serbia', 'ucrania', 'chequia', 'rusia', 'escocia',
        'gales', 'irlanda', 'hungría', 'rumania', 'eslovaquia', 'eslovenia',
        'islandia', 'finlandia', 'arabia saudita', 'irán', 'qatar', 'australia',
        'china', 'sudáfrica'
    ];

    if (SELECCIONES.includes(teamLower)) {
        return 'selecciones';
    }


    const sortedTeams = Object.keys(TEAM_TO_LEAGUE).sort((a, b) => b.length - a.length);

    for (const team of sortedTeams) {
        if (teamLower.includes(team)) {
            return TEAM_TO_LEAGUE[team];
        }
    }

    // Intentar detectar MLS o Liga MX por nombre de equipo
    const mlsOrMx = detectMLSorLigaMX(teamName);
    if (mlsOrMx) {
        return mlsOrMx;
    }

    return 'otros';
}


function detectCategory(league) {
    if (league === 'nba') {
        return 'nba';
    }
    return 'futbol';
}


function shouldExcludeImage(url, alt = '') {
    const urlLower = url.toLowerCase();
    const altLower = (alt || '').toLowerCase();


    for (const pattern of EXCLUDED_URL_PATTERNS) {
        if (pattern.test(urlLower)) {
            return true;
        }
    }


    for (const keyword of EXCLUDED_IMAGE_KEYWORDS) {
        if (urlLower.includes(keyword) || altLower.includes(keyword)) {
            return true;
        }
    }

    return false;
}


function extractTrailingNumber(url) {
    try {
        const clean = url.split('?')[0];
        const filename = clean.split('/').pop() || '';
        const base = filename.replace(/\.[^.]+$/, '');


        const m = base.match(/(\d+)(?!.*\d)/);
        return m ? parseInt(m[1], 10) : null;
    } catch {
        return null;
    }
}


function isHighResImage(url) {
    const u = url.toLowerCase();
    if (!u.includes('photo.yupoo.com')) return false;


    if (u.includes('square.jpg') || u.includes('/small.') ||
        u.includes('/medium.') || u.includes('/thumb.')) {
        return false;
    }


    if (/\/big\.jpg(\?.*)?$/i.test(u)) return true;


    const n = extractTrailingNumber(url);
    return n !== null;
}


function toHighResUrl(url) {

    let highRes = url.startsWith('//') ? `https:${url}` : url;


    highRes = highRes
        .replace(/\/small\./gi, '/big.')
        .replace(/\/medium\./gi, '/big.')
        .replace(/\/thumb\./gi, '/big.');

    return highRes;
}


function processImages(images, strictMode = false) {
    const seen = new Set();
    const validImages = [];

    for (const img of images) {

        if (!img.url || img.url === 'undefined' || img.url.includes('undefined')) continue;
        if (!img.url.includes('photo.yupoo.com')) continue;

        const url = toHighResUrl(img.url);


        if (seen.has(url)) continue;
        seen.add(url);


        if (shouldExcludeImage(url, img.alt)) continue;


        if (!isHighResImage(url)) continue;


        let fileNumber = null;
        const filename = img.filename || img.alt || '';


        const numMatch = filename.match(/(\d+)(?=\.[^.]+$)|(\d+)$/);
        if (numMatch) {
            fileNumber = parseInt(numMatch[1] || numMatch[2], 10);
        }


        if (fileNumber === null) {
            const hashMatch = url.match(/\/([a-f0-9]{8})/);
            if (hashMatch) {
                fileNumber = parseInt(hashMatch[1], 16);
            }
        }

        validImages.push({
            url,
            alt: img.alt || '',
            filename: filename,
            fileNumber: fileNumber
        });
    }


    if (process.env.DEBUG_YUPOO) {
        console.log('\n=== DEBUG: Imágenes válidas para selección ===');
        validImages.forEach((img, i) => {
            console.log(`${i}: filename="${img.filename}" num=${img.fileNumber} url=${img.url.substring(0, 60)}...`);
        });
    }



    const withNumber = validImages.filter(img => img.fileNumber !== null);

    let finalImages = [];

    if (withNumber.length >= 2) {

        withNumber.sort((a, b) => a.fileNumber - b.fileNumber);

        const minImg = withNumber[0];
        const maxImg = withNumber[withNumber.length - 1];

        finalImages = [minImg, maxImg];

        if (process.env.DEBUG_YUPOO) {
            console.log(`\nSeleccionadas: MIN=${minImg.fileNumber} (${minImg.filename}), MAX=${maxImg.fileNumber} (${maxImg.filename})`);
        }
    } else if (withNumber.length === 1) {
        finalImages = [withNumber[0]];
    } else if (validImages.length >= 2) {

        finalImages = [
            validImages[validImages.length - 1],
            validImages[validImages.length - 2]
        ];
    } else if (validImages.length === 1) {
        finalImages = [validImages[0]];
    }

    if (process.env.DEBUG_YUPOO) {
        console.log('=================================\n');
    }

    return {
        image: finalImages[0]?.url || null,
        images: finalImages.slice(1).map(img => img.url),
        allImages: finalImages.map(img => img.url)
    };
}




async function fetchYupooJson(albumUrl) {
    try {
        const albumId = extractAlbumId(albumUrl);
        if (!albumId) return null;


        const urlObj = new URL(albumUrl);
        const subdomain = urlObj.hostname.split('.')[0];


        const apiUrl = `https://${subdomain}.x.yupoo.com/api/albums/${albumId}?uid=1`;

        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'Referer': albumUrl,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) return null;

        const data = await response.json();
        return data;
    } catch (error) {

        return null;
    }
}


function parseYupooHtml(html, albumUrl) {
    const result = {
        title: '',
        images: []
    };



    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {

        result.title = titleMatch[1]
            .replace(/\s*\|\s*又拍图片管家.*$/i, '')
            .replace(/\s*\|\s*yupoo.*$/i, '')
            .replace(/\s*-\s*yupoo.*$/i, '')
            .replace(/\s*\|\s*Yupoo.*$/i, '')
            .replace(/\bjersey\b/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
    }









    const jsonDataPattern = /(?:photos|images)\s*[:=]\s*(\[[^\]]+\])/gi;
    let jsonMatch;
    while ((jsonMatch = jsonDataPattern.exec(html)) !== null) {
        try {
            const photosArray = JSON.parse(jsonMatch[1].replace(/'/g, '"'));
            for (const photo of photosArray) {
                if (photo.url || photo.src) {
                    result.images.push({
                        url: photo.url || photo.src,
                        alt: photo.name || photo.filename || photo.origin_name || '',
                        filename: photo.name || photo.filename || photo.origin_name || ''
                    });
                }
            }
        } catch (e) {
            // No es JSON válido, continuar
        }
    }

    // Patrón para encontrar bloques de foto con nombre asociado
    // Buscar patrones como: data-src="URL" ... title="10003.jpg" o similares
    const photoBlockPattern = /<div[^>]*class="[^"]*photo[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
    while ((match = photoBlockPattern.exec(html)) !== null) {
        const block = match[0];

        // Extraer URL de la imagen
        const urlMatch = block.match(/(?:data-src|src)=["']([^"']+photo\.yupoo\.com[^"']+)["']/i);
        if (!urlMatch) continue;

        const url = urlMatch[1];

        // Buscar nombre de archivo asociado en el mismo bloque
        // Patrones: title="10003.jpg", data-name="10003", texto como "10003.jpg"
        let filename = '';

        const titleMatch = block.match(/title=["']([^"']*\d+\.(?:jpg|png|jpeg)[^"']*)["']/i);
        if (titleMatch) filename = titleMatch[1];

        const dataNameMatch = block.match(/data-name=["']([^"']*)["']/i);
        if (!filename && dataNameMatch) filename = dataNameMatch[1];


        const filenameTextMatch = block.match(/>(\d+\.(?:jpg|png|jpeg))</i);
        if (!filename && filenameTextMatch) filename = filenameTextMatch[1];

        result.images.push({ url, alt: filename, filename });
    }


    const dataSrcPattern = /data-src=["']([^"']+)["'][^>]*>/gi;
    while ((match = dataSrcPattern.exec(html)) !== null) {
        const url = match[1];
        if (!url.includes('photo.yupoo.com')) continue;


        const contextStart = match.index;
        const context = html.substring(contextStart, contextStart + 300);

        let filename = '';
        const filenameMatch = context.match(/(\d{4,}\.(?:jpg|png|jpeg))/i);
        if (filenameMatch) filename = filenameMatch[1];

        const altMatch = context.match(/alt=["']([^"']*)["']/i);
        if (!filename && altMatch) filename = altMatch[1];

        result.images.push({ url, alt: filename, filename });
    }


    const srcPattern = /src=["']((?:https?:)?\/\/photo\.yupoo\.com[^"']+)["']/gi;
    while ((match = srcPattern.exec(html)) !== null) {
        result.images.push({ url: match[1], alt: '', filename: '' });
    }


    const seen = new Map();
    for (const img of result.images) {
        const key = img.url.replace(/^https?:/, '');
        if (!seen.has(key) || (img.filename && !seen.get(key).filename)) {
            seen.set(key, img);
        }
    }
    result.images = Array.from(seen.values());


    if (process.env.DEBUG_YUPOO) {
        console.log('\n=== DEBUG: Imágenes extraídas ===');
        result.images.forEach((img, i) => {
            const num = img.filename ? img.filename.match(/\d+/) : null;
            console.log(`${i}: ${img.filename || 'SIN_NOMBRE'} -> ${num ? num[0] : 'N/A'} -> ${img.url.substring(0, 60)}...`);
        });
        console.log('=================================\n');
    }

    return result;
}


async function fetchYupooAlbum(albumUrl) {
    const albumId = extractAlbumId(albumUrl);

    if (!albumId) {
        throw new Error(`URL de álbum inválida: ${albumUrl}`);
    }


    const jsonData = await fetchYupooJson(albumUrl);

    if (jsonData && jsonData.album) {
        const album = jsonData.album;
        return {
            title: album.title || album.name || '',
            images: (album.photos || []).map(photo => ({
                url: photo.url || photo.original_url || photo.big_url,
                alt: photo.name || ''
            }))
        };
    }


    const response = await fetch(albumUrl, {
        headers: {
            'Accept': 'text/html',
            'Referer': 'https://yupoo.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    });

    if (!response.ok) {
        throw new Error(`Error al cargar álbum: HTTP ${response.status}`);
    }

    const html = await response.text();
    return parseYupooHtml(html, albumUrl);
}


async function importFromYupoo(albumUrl, options = {}) {
    const { strictImages = false } = options;


    if (!albumUrl || !albumUrl.includes('yupoo.com')) {
        throw new Error('URL de Yupoo inválida');
    }


    const albumData = await fetchYupooAlbum(albumUrl);

    if (!albumData.title) {
        throw new Error('No se pudo extraer el título del producto');
    }


    const titleInfo = parseProductTitle(albumData.title);


    const imageData = processImages(albumData.images, strictImages);

    if (strictImages && !imageData.image) {
        throw new Error('No se encontraron imágenes de alta resolución (1000x1000)');
    }

    if (!imageData.image && albumData.images.length > 0) {

        imageData.image = toHighResUrl(albumData.images[0].url);
    }

    if (!imageData.image) {
        throw new Error('No se encontraron imágenes válidas en el álbum');
    }


    const league = detectLeague(titleInfo.team, titleInfo.isRetro);
    const category = detectCategory(league);


    const id = generateStableId(albumUrl);


    const product = {
        id,
        name: titleInfo.name,
        slug: generateSlug(titleInfo.name),
        category,
        league,
        image: imageData.image,
        images: imageData.images
    };


    if (titleInfo.temporada) {
        product.temporada = titleInfo.temporada;
    }

    if (titleInfo.tipo) {
        product.tipo = titleInfo.tipo;
    }

    if (titleInfo.isKids) {
        product.kids = true;
    }

    if (titleInfo.isRetro) {
        product.retro = true;
    }

    return product;
}

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');


function downloadImage(imageUrl, destPath, referer) {
    return new Promise((resolve, reject) => {
        const url = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
        const protocol = url.startsWith('https') ? https : http;

        const options = {
            headers: {
                'Referer': referer,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };

        const request = protocol.get(url, options, (response) => {

            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                downloadImage(response.headers.location, destPath, referer)
                    .then(resolve)
                    .catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }


            const dir = path.dirname(destPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const fileStream = fs.createWriteStream(destPath);
            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                resolve(true);
            });

            fileStream.on('error', (err) => {
                fs.unlink(destPath, () => { });
                reject(err);
            });
        });

        request.on('error', reject);
        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}


async function downloadAndConvertToWebP(imageUrl, destPath, referer, options = {}) {
    const { quality = 85 } = options;


    const tempPath = destPath + '.tmp';
    const webpPath = destPath.replace(/\.[^.]+$/, '') + '.webp';

    try {

        await downloadImage(imageUrl, tempPath, referer);


        let sharp;
        try {
            sharp = require('sharp');
        } catch (e) {

            console.warn('⚠️  sharp no está instalado. Ejecuta: npm install sharp');
            console.warn('    Guardando imagen sin conversión a WebP.');
            const originalExt = path.extname(imageUrl).split('?')[0] || '.jpg';
            const finalPath = destPath.replace(/\.[^.]+$/, '') + originalExt;
            fs.renameSync(tempPath, finalPath);
            return finalPath;
        }


        await sharp(tempPath)
            .webp({ quality })
            .toFile(webpPath);


        fs.unlinkSync(tempPath);

        return webpPath;
    } catch (err) {

        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
        throw err;
    }
}


async function downloadProductImages(product, assetsDir, options = {}) {
    const {
        convertToWebP = true,
        webpQuality = 85,
        generateThumbnails = true,
        thumbnailSize = 600,
        thumbnailQuality = 80,
        referer = 'https://yupoo.com/'
    } = options;

    const albumId = product.id.toString();
    const productDir = path.join(assetsDir, 'productos', 'Yupoo', albumId);
    const webPath = `/assets/productos/Yupoo/${albumId}`;


    if (!fs.existsSync(productDir)) {
        fs.mkdirSync(productDir, { recursive: true });
    }

    const downloadedImages = [];


    const allImages = [product.image, ...(product.images || [])].filter(Boolean);


    let sharp = null;
    if (generateThumbnails) {
        try {
            sharp = require('sharp');
        } catch (e) {
            console.warn('⚠️  sharp no disponible, miniaturas no se generarán');
        }
    }

    for (let i = 0; i < allImages.length; i++) {
        const imageUrl = allImages[i];
        const imageNumber = i + 1;
        const baseFilename = `${imageNumber}`;
        const localBasePath = path.join(productDir, baseFilename);

        try {
            let finalPath;

            if (convertToWebP) {

                finalPath = await downloadAndConvertToWebP(
                    imageUrl,
                    localBasePath + '.tmp',
                    referer,
                    { quality: webpQuality }
                );
            } else {

                const ext = path.extname(imageUrl).split('?')[0] || '.jpg';
                finalPath = localBasePath + ext;
                await downloadImage(imageUrl, finalPath, referer);
            }


            const finalFilename = path.basename(finalPath);
            downloadedImages.push(`${webPath}/${finalFilename}`);


            if (sharp && generateThumbnails && imageNumber <= 2) {
                try {
                    const miniFilename = `${imageNumber}_mini.webp`;
                    const miniPath = path.join(productDir, miniFilename);

                    await sharp(finalPath)
                        .resize(thumbnailSize, thumbnailSize, {
                            fit: 'cover',
                            position: 'center'
                        })
                        .webp({ quality: thumbnailQuality })
                        .toFile(miniPath);

                    console.log(`  ✓ Miniatura generada: ${miniFilename}`);
                } catch (thumbErr) {
                    console.warn(`  ⚠️ Error generando miniatura ${imageNumber}: ${thumbErr.message}`);
                }
            }

        } catch (err) {
            console.warn(`Warning: Failed to download image ${imageNumber}: ${err.message}`);
        }
    }

    if (downloadedImages.length === 0) {
        throw new Error('No se pudieron descargar imágenes');
    }


    return {
        ...product,
        image: downloadedImages[0],
        images: downloadedImages.slice(1)
    };
}

module.exports = {

    importFromYupoo,


    downloadProductImages,
    downloadImage,
    downloadAndConvertToWebP,


    TeamMatcher,
    loadExistingProducts,
    extractTeamTokens,
    calculateTokenSimilarity,
    normalizeForComparison,


    generateStableId,
    extractAlbumId,
    generateSlug,
    generateImageAlt,
    normalizeText,
    parseProductTitle,
    detectLeague,
    detectCategory,
    processImages,
    shouldExcludeImage,
    isHighResImage,
    toHighResUrl,
    fetchYupooAlbum,


    TEAM_TO_LEAGUE,
    TEXT_NORMALIZATION,
    EXCLUDED_IMAGE_KEYWORDS,
    TEAM_STOPWORDS
};

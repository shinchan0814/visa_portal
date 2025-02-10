import React, { useState, useEffect } from 'react';
import CountryCard from '../components/countryCard';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Head from 'next/head';
import GoToTopButton from '../components/GoToTopButton';
import { useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
//import '../styles/app.module.css';
//import '../styles/styles.module.css'; // or import './styles.scss';

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [visaFilters, setVisaFilters] = useState(['All']);
  const visaTypes = ['All', 'E-visa', 'Visa on Arrival', 'Visa Free', 'Visa Required'];
  const [stickySearchBar, setStickySearchBar] = useState(false);
  const [stickyVisaFilters, setStickyVisaFilters] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // useEffect(() => {
  //   fetch('./data/FinalDataCountry.json')
  //     .then(response => response.json())
  //     .then(data => setCountriesData(data))
  //     .catch(error => console.error('Error loading the JSON data:', error));

  //   const handleScroll = () => {
  //     const searchBarElement = document.getElementById('searchBar');
  //     if (searchBarElement) {
  //       const searchBarOffset = searchBarElement.getBoundingClientRect().top;
  //       setStickySearchBar(window.scrollY > searchBarOffset);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const debouncedSetSearchTerm = useCallback(
    debounce((value) => {
      console.log(value)
      setSearchTerm(value);
    }, 300),
    []
  );
  useEffect(() => {
    fetch('./data/FinalDataCountry.json')
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => a.priority - b.priority);
        setCountriesData(sortedData);
      })
      .catch(error => console.error('Error loading the JSON data:', error));
  
    const handleScroll = () => {
      const searchBarElement = document.getElementById('searchBar');
      if (searchBarElement) {
        const searchBarOffset = searchBarElement.getBoundingClientRect().top;
        setStickySearchBar(window.scrollY > searchBarOffset);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVisaFilterChange = (type) => {
    if (type === 'All') {
      setVisaFilters(['All']);
    } else {
      setVisaFilters(prevFilters => {
        if (prevFilters.includes('All')) {
          return [type];
        } else {
          const newFilterList = prevFilters.includes(type) ?
            prevFilters.filter(filter => filter !== type) :
            [...prevFilters, type];
          return newFilterList.length === 0 ? ['All'] : newFilterList;
        }
      });
    }
  };

  // const filteredCountries = countriesData.filter(country =>
  //   (visaFilters.includes('All') || visaFilters.includes(country.visaType)) &&
  //   country.countryName.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  // const filteredCountries = countriesData.filter(country =>
  //   (visaFilters.includes('All') || visaFilters.includes(country.visaType)) &&
  //   (country.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //    country.canonicalNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())))
  // );

  const filteredCountries = useMemo(() => {
    return countriesData.filter(country =>
      (visaFilters.includes('All') || visaFilters.includes(country.visaType)) &&
      (country.countryName.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
       country.canonicalNames.some(name => 
         name.toLowerCase().includes(searchTerm?.toLowerCase() || '')
       ))
    );
  }, [countriesData, visaFilters, searchTerm]);


  return (
    <>
      <Head>
        <title>Get Visa to 150+ Countries effortlessly | Apply online- visa saathi</title>
        <meta name="description" content="Get hassle-free assistance for your visa applications. Visa Saathi provides expert guidance, easy tracking, and personalized solutions for all your travel needs." />
        <meta name="keywords" 
        content="thailand visa to indian, thailand visa requirements for indian, visa for thailand for indian, thailand visa for india, thailand visa to india, thailand visa indian, indian thailand visa, visa of thailand from india, visa for dubai, thailand visa in india, 
        visa for indian citizens to singapore, us visa visa, visa for singapore for indian citizens, visa in america, visa singapore for indian, singapore visiting visa for indian, visa vietnam for indian, visa for united states, indian visa for singaporeans, 
        singapore visitor visa for indian, visa for india from singapore, visa in singapore for indian, visa for indian in singapore, vietnam visa for india, singapore visa requirements from india, visa for vietnam for indian, indian visa in singapore, 
        visa for singapore for indian, visa for india singapore, united states visa, travel visa for singapore from india, indian visa in vietnam, beach visa requirements, beach travel visa, thailand beach visa, beach destinations visa, visa for beach travel, 
        indian beach vacation visa, international beach visas, beach holiday visa requirements, singapore travel visa from india, visa malaysia for indian, malaysian visa from india, visa india for malaysian, visa for india from malaysia, visa from malaysia to india, 
        malaysia visa for india, malaysia visiting visa from india, malaysia to india visa, visa india from malaysia, visit visa malaysia from india, visa of dubai for indian, malaysia visit visa from india, visa for dubai for indian, malaysian visa in india, 
        malaysia visa indian, visa indian malaysia, malaysia visa for indians, dubai visa for india, visa a dubai, turkey tourist visa for indian, thailand free visa, canada visa visa, canada in visa, visa for singapore, canadian visa for india, indian visa for japan, 
        japan travel visa for indian, visa fees for dubai tourist visa, indian canada visa, japan visa requirements for indian, visa canada from india, american visa appointment india, canada travel visa from india, indian us visa appointment, 
        canada visa for indians, japan visa, dubai visiting visa fee, dubai visa fees for indian citizens, uae visa fee for indian, uae visa charges for indian, visa fee for uae from india, visa for japan from india, visa fees for uae from india, hk visa for indian, 
        japan visa from india, indian visa fees dubai, visa for dubai from india fees, india visa for japanese, dubai visa from india fees, dubai visa fees from india, dubai visa charges from india, dubai visa from india charges, visa for japan for indian, 
        dubai visit visa fees from india, dubai visa fee in india, uae visa charges for indians, indian visa japan, dubai visa expense, dubai visa charges india, japan visa in india, india visa japan, india visa fees in dubai, visa india japan, 
        azerbaijan visa requirements for indian citizens, canada visa for indian, canadian visa for indian, australian visa requirements for indian citizens, visa of bangladesh,
        indian visa for azerbaijan, azerbaijan visa for indian, us tourist visa fee for indian, georgia visa from india, georgia visa for india, indian visa for indonesia, australia visa visa, visa fees usa india, canada visa indian, indonesian visa from india, 
        georgia visit visa for indian, visa for canada from india, us tourist visa fees for indian, indian visa from australia, bangladesh travel visa, visa for indonesia from india, us tourist visa fees from india, tourist visa for canada, visa for indian in indonesia, 
        australia visitor visa for indian, tourist visa for the usa, australian visa india, indian visa in australia, georgia indian visa, georgia visa indian, visa for australia for indian, australia visa indian, malaysia visa e visa, visa cost for usa from india, 
        visa for canada in india, us visitor visa fees from india, travel visa to australia from india, indonesia visa for indians, visa of malaysia, visa in malaysia,
        india to america visa price, malaysia visa free, malaysia free visa, free visa malaysia, visa for bangladesh, australia visa requirements for indian citizens, apply visa america, philippines visa for indian nationals, visa apply for america, us visa tourist visa, 
        australian visa from india, visa for india australian, south korea visa requirements for indian citizens, australia visa for indian, indian visa for australian, filipino visa for india, visa for usa tourist, visa for azerbaijan from india, visa for america tourist, 
        uk visa for indian, visa usa apply, apply american visa, visiting visa usa, apply for american visa, tourist visa to america, canada visa for tourist, visa on arrival countries for indian, philippines visa for indian, indian visa for philippines, 
        philippines visit visa for indian, tourist america visa, azerbaijan visa for india, visa usa tourist, american visa tourist, visa for azerbaijan from india, visa for america from india, visa for azerbaijan for indian, visa for america for indian,
        visa for australia from india, visa in india for filipino, australia visa to india, visa for uk from india, visa for united kingdom from india, on arrival visa countries for india, australia visa from india, visa for philippines from india, uk visa indian, 
        visa for india from philippines, tourist visa of usa, tourist visa in usa, canada visa for tourists, indian visa for south korea, visa for philippines for indian, united kingdom visa from india, uk visas for indian, visitors visa usa, united states tourist visa, 
        tourist visa united states, uk visa for indians, visa for south korea from india, visa for south korea for indian, apply for visa in usa, philippines visa for india, tourist visa of america, india visa for philippines, united states visa application, 
        thailand visa free for indians, maldives visa requirements for indian citizens, tourist visa usa for indian, china visa requirements for indian citizens, tourist visa for usa from india, visa for kazakhstan from india,
        china visa application from india, us visitor visa from india, visa international japan, tourist visa for singapore from india, atlys visa, us visa for indian tourists, turkey visa for india, visa for china from india, china visa to india, uk travel visa from india, 
        china visa for india, uk visitor visa from india, singapore tourist visa from india, singapore visitor visa from india, china visa from india, singapore visit visa from india, visa japan, china visa indian, oman visa requirements for indian citizens, 
        mauritius visa requirements for indian citizens, indian visa for usa, canada tourist visa for indian, switzerland visa for indian, canada visa for indian tourist, tourist visa canada for indian, us india visa, visa us india, indian visa for us, us visa india, 
        visa for america from india, egypt visa requirements for indian citizens, canada visit visa for indian, indian visa in us,
        canada visa for indian tourists, canada visitor visa for indian, visa for usa from india, visa for oman from india, visa from usa to india, visa for india usa, new zealand visa requirements for indian citizens, indian visa for mauritius, mauritius visa for indian, 
        canadian visit visa from india, visa of usa for indian, visa for cambodia for indian, australian tourist visa for india, tourist visa for canada from india, australia visa tourist visa, tourist visa for india from canada, visa for usa for indian, canada tourist visa from india, 
        american visa for indian, american visa india, tourist visa canada from india, tourist canada visa from india, cambodia visa from india, australian tourist visa from india, canada tourist visa requirements from india, visa for oman for indian, america visa india, thailand visa charge, 
        australian visa for indian tourist, tourist visa australia for indian, australia tourist visa for indian, mauritius visa requirements for indian, australian tourist visa for indian, visa for mauritius from india, visa for india from mauritius, visa for switzerland from india, 
        canada visiting visa from india, us visa to india, schengen visa fee in indian rupees, india to switzerland visa, visitor visa india to canada, us visa in india, visiting visa for canada from india, visiting visa to oman from india, oman visa from india, canada visa tourist india, 
        canada tourist visa india, tourist visa canada india, nz visa for indian, visitors visa for canada from india, canada visit visa india, visit visa oman from india, australia tourist visa for india, tourist visa for australia from india, canada visitor visa requirements from india, 
        visa for usa in india, switzerland visa from india, australian tourist visa india, egypt visit visa for indian, mauritius visa for india, saudi visa from india, visit visa to oman from india, cambodia visa indian, canada tourist visa in india, australian visa visit, canada visitor visa india, 
        canada tourist visa for indians, visa india usa, australia tourist visa from india, tourist visa australia from india, indian tourist visa australia, tourist visa of canada from india, visa for egypt from india, mauritius visa from india, visa for new zealand from india, visa for india from new zealand, 
        australian visa for tourist, indian visa new zealand, new zealand visa indian, russia visa for indians, travel visa for australia from india, visitor visa for australia from india, visa for egypt for indian, saudi tourist visa india, saudi visit visa india, visit visa for australia from india, 
        saudi arabia visit visa for indian, new zealand visa india, canada visitor visa for indians, visa for switzerland in india, visitor visa from india to australia, australia visa for tourist, tourist visa for australia, visa for tourist australia, visa for australia tourist, uae visa check by passport no, 
        uae visa status with passport number, cambodia visa for indians, visitor visa for saudi arabia from india, australia visitor visa requirements from india, australia visiting visa, us visas for indian,
        australia tourist visa india, tourist visa to australia, malaysia visa free for indian, malaysia visa free for india, malaysia visa free for indians, armenia visa requirements for indian citizens, bangladesh visa for indian, indian visa for bangladesh, indian visa to bangladesh, 
        armenia visa for indian, visa for uzbekistan from india, kenya visa requirements for indian citizens, visa for armenia from india, qatar visa requirements for indian citizens, greece visa requirements for indian citizens, visa for india from bangladesh, russia tourist visa for indian, 
        dubai tourist visa requirements for indian citizens, germany visa for indian, bangladesh visa for india, india visa for bangladesh, bangladesh to india visa, singapore visa fee for indian, uk visa fees for indian, india visa for uzbekistan, armenia visa for india, singapore visa charges for indian, 
        armenia visa from india, singapore visa fees for indian, qatar visa for indian, italy visa for indian, visa for kenya from india, visa for qatar from india, spain visa for indian, spanish visa india, german visa from india, visa for india from ireland, visa for ireland from india, 
        germany visa for india, dubai visa for indian tourist, visa for germany from india, canada visa fee tourist, visa for india ireland, bangladesh visa indian, indian visa from spain, apply for dubai tourist visa online, bangladesh visa for indians, visa for kenya for indian, indian visa from italy, 
        apply dubai tourist visa online, visa of qatar for indian, visa for qatar for indian, singapore visa fees from india, visa charges for singapore from india, tourist visa for india from dubai, visa for greece from india, indian visa ireland, visa for ireland, apply for dubai visa online, 
        visa apply for dubai online, visa for dubai apply online, apply for visa online dubai, canada tour visa fee, online visa apply for dubai, visa for italy from india, apply online dubai visa, singapore visit visa fees from india, dubai online visa apply, dubai visa online apply, 
        visa apply online dubai, apply visa online dubai, apply dubai visa online, dubai visa apply online, online apply dubai visa, apply visa dubai online, visa application for spain from india, uk visa india fees, online dubai visa apply, kenya visa from india, visa for greece for indian, 
        greece visa for india, bangladesh visa in india, italy visa for india, charges for malaysia visa, visa for spain from india, singapore visa cost for indian, visiting visa for dubai from india, visa for dubai online, qatar visit visa from india, dubai visiting visa from india, apply to dubai visa online, 
        uk visa charges in india, visa for germany, qatar visa from india, dubai visitor visa from india, australian visit visa fees, australian tourist visa application fee, german visa for indian, canada tourist visa fees, australia visa tourist fee, australia tourist visa fee, tourist visa dubai from india, 
        dubai tourist visa from india, visa australia fee, visa on arrival uae for indian, uae visa on arrival for indian, visiting visa to kuwait, apply for dubai visa, dubai travel visa from india, visa apply for dubai, for dubai visa, apply for a dubai visa online, italy visa from india, spain visa from india, 
        india visa from italy, visa for spain for indian, visa spain from india, saudi visit visa fees, online apply dubai visit visa, free visa kenya, is thailand visa free for india, georgia country visa, russia visa requirements for indian citizens, bhutan visa requirements for indian citizens, canada visa fee for indian, 
        russian visa for india, irish visa for india, morocco visa requirements for indian citizens, canadian visa fees from india, thai visa from india, visa for russia for indian, irish visa for indian, visiting america visa, russian visa for indian, visa requirements for indian citizens to morocco, indian visa for russian, 
        russian visa india, canada visa from india fees, irish visa india, canada visa charges from india, visit visa america, visa for israel from india, mexico visa for indian, visa for bangkok from india, visiting visa for usa, visa in kuwait for indian, visiting visa to kuwait from india, singapore work visa requirements for indian citizens, 
        brazil indian visa, visit visa for kuwait from india, thailand visiting visa from india, georgia country e visa, visitor visa for usa, visa for usa visitor, thai visa for indian, brazil india visa, travel visa to usa, visitors visa america, indian visa thailand, visa to thailand for indians, visa for bhutan for indian, 
        bangkok visa from india, indian visa for morocco, morocco visa for indian, ireland visa indian, thai visa in india, russian visa for indians, russia visa india, india visa russia, visit visa to kuwait from india, thai visa india, visa for switzerland, visa for morocco from india, visitors visa for usa, 
        visit visa in usa, visit visa of usa, singapore job visa for indian, bangkok visa for indians, visit united states visa, mexico visa indian, indian visa kuwait, mexico indian visa, country visa free, countries visa free, visa free places, countries with free visa, visa free travel russia, visa free entry countries, 
        is thailand visa free for indians, visa free entry russia, malaysia visa free india, visa free travel to russia, visa for georgia country, brazil visa requirements for indian citizens, portugal visa for indian, taiwan visa requirements for indian citizens, israel visa requirements for indian citizens, visa apply for usa from india, 
        apply visa for usa from india, indian visa from pakistan,
        visa requirements for brazil for indian citizens, visa application for bangladesh, visa for india from pakistan, indian visit visa for pakistani, visa for nepal for indian, bangladesh visa form, visa to dubai for indian, portugal visa for india, visa for france from india, visa for brazil for indian, 
        pakistan visa from india, france visa for india, nepal to india visa, visa application bangladesh, bangladesh visa application, canada visiting visa fee, apply visa for usa in india, indian visa in nepal, indian visa from dubai, portugal visa indian, portuguese visa for indian, 
        visa for taiwan from india, apply for us visa india, tourist visa fees for usa, french visa india, israel visa from india, pakistan and india visa, india and pakistan visa, brazil visa indian, indian visa brazil, us visa requirements from india, pakistan visa for indians, india visa brazil, 
        visit visa for indian to dubai, visa for india from dubai, us visa apply in india, visa to dubai from india, taiwan visa from india, apply for us visa from india, visa application usa online, visa for maldives, saudi visa check online by passport number, visa for georgia, nepal visa for indians, 
        australian tourist visa fee, visa dubai from india, visa of france from india, india visa from dubai, visa requirement for maldives, thailand on arrival visa for indian, thailand visa on arrival for indian, australia visa fee tourist, pakistan india visa, india pakistan visa, pakistan visa india, 
        indian visa in dubai, france visa in india, israel visa in india, visa india france, visa india portugal, visa required for maldives, vietnam visa free for indian, malta country visa, bahrain country visa, kazakhstan visa requirements for indian citizens, finland visa for indian, 
        visa for iceland from india, france visa for indian, how to apply schengen visa from india, visa for iceland for indian, kazakhstan visa for indian, vietnam visa fees for indian, visa for russia, visa form bangladesh, tourist visa for usa, tourism visa for usa, france visa application from india, 
        finland visa from india, visa fees for vietnam from india, turkey visa fees for indian, france visa from india, visa for luxembourg from india, iceland indian visa, turkey visa fees india, luxembourg work visa for indian, canada tourist visa requirement, bahrain visa policy, vietnam visa cost for indian, 
        canada working visa from india, netherlands visa from india, visa for oman, netherlands tourist visa from india, apply singapore tourist visa online, iceland visa in india, turkey visa charges from india, visa application russia, french visa for indian, russia visa application, europe visa for indians, 
        jordan visa for indian, japan tourist visa indian, japan visa requirements india, jordan visit visa for indian, visa for jordan from india, canada visa requirements for tourist, visa charges for turkey from india, canada tourist visa requirements, iceland visa india, tourist canada visa requirements, 
        uk visitor visa fees india, emirates online visa, canada visa requirements tourist, apply singapore visa online, singapore visa apply online, apply for singapore visa online, visa apply online singapore, apply visa singapore online, iceland visa for indians, online singapore visa apply, russia visa, 
        india to vietnam visa cost, apply online visa for singapore, visa fee to vietnam, singapore visa online apply, apply online singapore visa, apply online for singapore visa, singapore online visa apply, work visa for luxembourg from india, russia visa free for indians, is malaysia visa free for indian, 
        is malaysia visa free for india, iran visa requirements for indian citizens, tanzania visa requirements for indian citizens, online visa for bangladesh, bahrain visa requirements for indian citizens, bahrain visit visa requirements for indian citizens, bangladesh online visa, online visa bangladesh, 
        bangladesh visa online, visa online bangladesh, online bangladesh visa, visa for laos from india, indian visa from poland, visa for iran from india, visa of pakistan, australian visa fees from india, norwegian visa from india, renewing us visa in india, visa for tanzania from india, serbia visa from india, 
        poland visa for india, luxembourg visa for indian, visa for norway from india, thailand visa cost for indian, visa for malaysia, poland visa from india, us visa tourist visa requirements, saudi government visit visa, croatia visa from india, australian work visa from india, australia visa fees for india, 
        tanzania visa from india, visa for poland, visa for seychelles from india, norway visa from india, bahrain visa from india, visit visa bahrain from india, bahrain visit visa from india, dubai work permit visa for indian, tourist visa america requirements, australia working visa for indian, tourist visa requirements usa, 
        online visa to dubai, visa for macau for indian, iran visa india, australia visa fees in india, australia work permit visa from india, croatia visa indian, japan visa for tourist, visa for japan tourist, american tourist visa requirements, tourist visa for japan, iran visa for indians, visit visa for malaysia, 
        visa for thailand from india cost, visitor visa for malaysia, tour visa for thailand, japan visiting visa, luxembourg visa from india, visiting visa japan, visa for china, america visa process, online visa emirates, visit visa for saudi, visa online emirates, how to apply visa usa, vietnam e visa for indian, 
        russia visa free for indian, is vietnam visa free for indian, is vietnam visa free for india, is malaysia visa free for indians, romania visa requirements for indian citizens, free visa jobs in israel, malaysia visa fees for indian, japan tourist visa requirements for indian citizens,
        romanian visa from india, austria visa for indian, malaysia visa from india fee, countries without visa, without visa countries, apply american visa online, tourist visa from india, tourist visa to usa, visa for romania from india, visa for macau from india, 
        tourist visa japan for indian, malaysia tourist visa fees from india, japan tourist visa for india, malaysia visa cost for indian, malaysia tourist visa cost for indian, malaysia tourist visa for indian cost, visa usa apply online, austria visa for india, 
        romania visa from india, us visa visitor visa, arrival visa indian passport, tourist visa japan from india, tourism visa usa, tourist visa for thailand for indian, australia visiting visa fee, thai tourist visa for indian, malaysia visa for indians charges, 
        malaysia visa charges for indians, austria visa from india, cambodia visa e visa, uae visit visa indian, tourist visa thailand from india, usa visit visa apply online, visa for kenya, uk visa time taken india, visa for istanbul from india, visa on arrival malaysia for indian, 
        malaysia on arrival visa for indian, visa check for malaysia, romania visa for indians, visa for armenia, visa for istanbul for indian, online visa for singapore, thailand visa for tourist, malaysia visa cost from india, visa cost for malaysia from india, 
        visa free countries us passport, us passport visa free countries, visa free countries with american passport, us passport visa free, visa free us passport, us citizenship visa free countries, us citizen visa free countries, thailand free visa for indians, 
        myanmar visa requirements for indian citizens, iceland country visa, montenegró visa for indian, argentina visa requirements for indian citizens, visa for myanmar from india, myanmar visa for indian, apply for bangladesh visa, malaysia tourist visa requirements for indian citizens, 
        burma visa for indian, thailand visa fees for indian, myanmar visa from india, america visa, visa for colombia from india, australia tourist visa fee for indian, sri lanka visa free for indians, visa apply bangladesh, saudi tourist visa for indian, american visa, 
        georgia visa for indian, cyprus visa requirements for indian citizens, malaysia visa for indian tourist, apply uk tourist visa from india, australia visa fees for indian tourist, australian tourist visa fees from india, thailand visa fees from india, indian tourist visa fees from australia, 
        colombia visa from india, saudi tourist visa for india, visitor visa from india, russia e visa for indian, apply uk visa from india, argentina visa from india, indian tourist visa fees australia, visa for austria from india, singapore visa to indian, apply for uk visa india, 
        singapore visa application for indian, indian visa for singapore, saudi tourist visa from india, israel working visa for indian, visa for iceland, malaysian tourist visa from india, luxembourg work visa fees for indian, tour visa to usa, israel work visa for indian, visa for usa travel, 
        travel visa for usa, cyprus visa for indian, indian visa colombia, malta visa from india, australia tourist visa fees from india, myanmar visa for indians, thailand e visa for indian, american travel visa, america travel visa, travel visa america, tourist visa malaysia from india, 
        visa cost bangladesh, bangladesh visa cost, apply for a uk visa from india, colombian visa for indian, bangladesh visa charges, australia tourist visa cost for indian, how to apply tourist visa usa, travel visa usa, indian visa fee for sri lanka, visa usa travel, myanmar visa india, 
        india visa myanmar, travel visa to america, australia visitor visa fees from india, india visa for singaporean, israel work visa from india, sri lanka visa fees for indian, tourist visa malaysia for indians, malaysia tourist visa for indians, thailand visa cost from india, poland work visa india, 
        singapore visa for india, saudi arabia tourist visa for indian, visa to switzerland, applying for uk visa from india, japan e visa for indian, bahrain visa check online by passport number, canada work visa fees in indian rupees, saudi tourist visa for indians, bahrain visiting visa charge, 
        japan visa fees, does sri lanka need visa for indian, bahrain visit visa fee, visa fees japan, colombia visa for indians, free visa america, america free visa, visa free countries usa, visa free usa, visa free country for sri lanka, visa free united states, visa free country for us, 
        india russia visa free travel, thailand visa free for indian 2025, is dubai visa free for india, romania country visa, uae free visa info, fiji visa requirements for indian citizens, visa free for us, saudi visit visa for indian fees, russian tourist visa for indian fees, japan visa fees for indian, 
        baku visa for indian, china visa fee for indian, china tourist visa requirements for indian citizens, visa for argentina from india, hungary visa from india, visa for iran, indonesia visa for indian, tourist visa usa application, tourist visa application usa, iraq visa for indian, 
        american tourist visa application, germany tourist visa for indian, almaty visa for indian, china visa fees from india, china visa from india fees, visa from india to malaysia, online visa for malaysia, bulgaria visa from india, china tourist visa for indian, tourist visa for germany from india, 
        malaysia tourist visa online, malaysian visa for indian, poland work visa from india, usa visit visa application, argentina visa indian, india to malaysia visa, uae online visa government website, visa of brazil, uae visa online government website, indonesia tourist visa from india, 
        apply visa canada, apply for united arab emirates visa, tourist visa application united states, visa charges for bali from india, russian visa, visa for paris from india, visa russian, work visa for poland from india, visa required for thailand, tourist visa america cost, visa brazil, 
        malaysia visa online, tourist visa validity for usa, hungary visa for indians, online visa malaysia, travel visa to brazil, online malaysia visa, visa online malaysia, usa tour visa, visa malaysia online, canada visa apply online, check saudi visa status by visa number, saudi visa no check, 
        germany visitor visa from india, apply to canada visa, apply to uae visa online, german tourist visa for indian, visa for taiwan, qatar visa status by passport no, visa for vietnam online, tourist visa usa cost, tourist visa application for germany, american tourist visa cost, israel work visa cost for indian, 
        how apply canada visa, uae visa apply online, apply online uae visa, online uae visa apply, tourist visa for usa duration, argentina visa india, visa free thailand for indian, peru visa requirements for indian citizens, germany visa fees for indian, indonesia visa on arrival for indian passport holders, 
        portugal working visa for indian, tourist visa fees for usa from india, american passport and visa, apply for tourist visa usa, apply tourist visa for usa, portugal work visa for indian, apply tourist visa america, passport visa usa, apply for tourist visa america, tourist visa usa apply, 
        usa apply tourist visa, apply tourist visa usa, visitor visa fees for usa from india, finland work visa for indian, ireland tourist visa for indian, germany visa fees from india, apply for american tourist visa, visa for canada, bangladesh visa office, malaysia tourist visa online apply, 
        visit visa for usa from india, visa for peru from india, us tourist visa from india fees, visa for hungary, usa visit visa apply, tourist visa for switzerland from india,
        us passport visa, passport visa us, denmark visa from india, ireland working visa for indian, us visa passport, portugal work visa from india, apply tourist visa in usa, apply for malaysia visa online, apply online visa for malaysia, tourist visa for ireland from india, 
        bangkok visa for india, apply for visitor visa usa, visa fee for maldives, apply visa online malaysia, malaysia visa online apply, apply online malaysia visa, apply for australian visa, visa for us passport, tourist visa switzerland from india, tourist visa ireland from india, 
        ireland tourist visa from india, apply for tourist visa for usa, work visa for finland from india, malaysia e visa for indian, indian visa denmark, apply to malaysia visa online, apply for tourist visa in usa, umrah visa fees for indian, thailand visa form, south korea visa for indian, 
        peru visa from india, ireland visitor visa from india, malaysia visa on arrival for indian, visiting visa to ireland from india, australian visa apply, apply visa for australia, visa apply for australia, apply for visa australia, apply australian visa, georgia e visa for indian, 
        ireland visit visa from india, korea visa fee, irish visa application, apply to australian visa, visa for tanzania, how to apply uk visa from india, how to apply canada tourist visa, dubai visa status with passport number, umrah visa fee from india, free dubai visa, dubai visa free, 
        is russia visa free for indian, free visa of dubai, free visa in dubai, dubai visa free for indians, dubai visa free for india, is indonesia visa free for indian, is indonesia visa free for india, apply singapore visa online for indian citizens, japan visa requirements for indian citizens, 
        indonesia visa fees for indian, dubai visa for indian passport, amsterdam visa requirements for indian citizens, indian passport visa on arrival countries, indonesia visa fee for indian, visa to america, czech republic visa for india, czech republic visa from india, visa for sweden from india, 
        czech republic visa for indian, taiwan visa for indian, visa policy serbia, dubai visa indian passport, japanese visa requirements for indian citizens, indian citizen japan visa, us visa application for indian, qatar tourist visa for indian, apply visa for dubai from india, online visa for thailand, 
        indonesia visa cost for indian, saudi arabia visa for indian citizens, sweden visa from india, saudi visa requirements for indian, apply dubai visa from india, tourist visa for qatar from india, visa usa, on arrival dubai visa for indian passport, tourist visa to qatar from india, 
        tourist visa for thailand from india, indonesia visa charges for indians, online visa thailand, apply for dubai visa india, thailand visa online, thailand visa application online, new zealand visa for indian, dubai visa on arrival indian passport, thailand visa for indian tourists, 
        visa apply for malaysia online, dubai visa india passport, japan working visa for indian, ireland work visa for indian, ethiopian visa for indian, application for thailand visa, apply visa malaysia online, visa for amsterdam from india, malaysia visa apply online, apply malaysia visa online, 
        japan work visa for indian, visa on arrival for nepali, irish visa fee, qatar tourist visa from india, visa for france, how to apply for canada tourist visa from india, vietnam tourist visa for indian, visa canadá, on arrival visa for indian passport in dubai, visa on arrival for indian passport in dubai, 
        apply tourist visa for australia, apply for tourist visa australia, russia visa check, apply australian tourist visa, japan embassy visa form, work visa italy for indian, greek visa from india, visa for serbia, dubai tourist visa for india, visa on arrival in hong kong for indian passport, 
        malaysia visit visa online apply, apply australia tourist visa, dubai visa apply india, australia tourist visa apply, online visa for china, indonesia e visa for indian, india new zealand visa, sweden visa india, application for japan visa, application for visa japan, uk visa application india, 
        us visa india fee payment, working visa for japan from india, apply for dubai visa in india, australia e visa for indian, greece visa from india, china visa online application, usa tourist visa documents, mongolian visa for indian, visa free for pakistan, free visa russia, russia free visa, 
        free russia visa, free visa for russia, singapore visa free, dubai visa free for indian, indonesia visa free for indian, bolivia visa for indian citizens, uae visa for indian citizens, cuba visa requirements for indian citizens, visa for ecuador for indian citizens, belgium visa for indian, 
        uae visa requirements for indian citizens, nigeria visa for indian, visa for cuba from india, tourist visa application for usa from india, malaysia transit visa for indian, barbados visa for indian, visa requirements for indian citizens to uae, china visa for indian fees, visa for india from belgium, 
        visa for belgium from india, kuwait employment visa for indian, for american visa, cuba visa from india, tourist visa to usa from india, visa for india belgium, russia work visa for indian, japan tourist visa for indian fees, visa for nigeria from india, indian tourist visa usa, visiting visa usa from india, 
        belgium visa from india, tourist visa uae for indian, uae visa for indian tourist, uae tourist visa for indian, bali visa fee for indian, bali visa fees for indian, india visitor visa to usa, travel visa for usa from india, business visa for usa from india, transit visa in malaysia for indian, visitor visa from india to usa, 
        barbados visa from india, india tourist visa usa, nigeria visa from india, how to apply tourist visa for usa from india, tourist visa for uae from india, indian visa belgium, afghanistan visa for indian, denmark work permit visa from india, israel visa online, indian citizen uae visa, apply for malaysia tourist visa, 
        malaysia transit visa indian, visitors visa from india to usa, malaysia transit visa from india, russian work visa for indian, saudi visa online, canada tourist visa fees in indian rupees, saudi online visa, bangladesh tourist visa, visa fee to japan, how to apply dubai tourist visa from india, us travel visa from india, 
        scotland visa for indian, visa policy albania, albania visa policy, lithuania visa for indian, us visa fees indian rupees, dubai visa for indian tourists, tourist visa to dubai from india, indian visa nigeria, uae visiting visa from india, cuba visa india, tourist visa to philippines from india, apply malaysia tourist visa, 
        italy tourist visa for indian, turkish visa online, kuwait work visa from india, malaysia tourist visa apply, afghanistan visa for india, visa for brunei for indian, indonesia on arrival visa for indian, work visa for kuwait from india, visa india belgium, indonesia visa fee, indonesia visa on arrival for indian, 
        visa belgium india, belgium visa in india, lithuania work visa for indian, india visa belgium, tourist visa to us from india, visa fees indonesia, us visa from mumbai, application for schengen visa online, online visa application indonesia, indonesia online visa, indonesia visa online, italy tourist visa requirements from india, 
        documents required for usa visitor visa from india, kuwait work visa apply online, how to apply visa for dubai from india, malaysia free visa for indian, thailand is visa free for indian, is qatar visa free for indian, ecuador visa for indian citizens, indian visa us citizens, dubai visa for indian citizens, mexico visa for indian with us visa, 
        zambia visa for indian citizens, dubai visa to indian citizens, mexico visa requirements for indian citizens with us visa, barbados visa requirements for indian citizens, bosnia visa requirements for indian citizens, estonia visa for indian,
        "
        />
         
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{
          backgroundImage: 'url("images/  ")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Header */}
          <>
            {/* Mobile Header with Hamburger Menu */}
            <Box
              sx={{
                width: ['100%', '50%'],
                height: 50,
                display: { xs: 'flex', sm: 'none' }, // Show flex display on small screens, hide on larger screens
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '3px 35px', // Adjusted padding for spacing
                backgroundColor: '#fff', // Adjusted background color
                position: 'fixed', // Changed to fixed positioning
                paddingTop: stickySearchBar ? '25px' : '0',
                top: 0,
                zIndex: 1200,
              }}
            >
              {/* Logo */}
              <div style={{ display: 'flex', gap: '9px', alignItems: 'center', paddingLeft: '25px' }}>
                <img src="/images/website/Saathi_img.png" alt="Logo" style={{ width: '28.24px', height: '46px', justifyContent: 'center' }} />
                <div style={{ alignItems: 'baseline', display: 'flex', gap: '7px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '36px', color: 'rgba(96, 92, 212, 212)', padding: '0px 0px', fontFamily: 'Nunito Sans, sans-serif' }}>Saathi</div>
                  <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif' }}>Visa</div>
                </div>
              </div>

              {/* Hamburger Icon and Menu for Mobile */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'right' }}>
                {/* Hamburger Icon */}
                <div style={{ cursor: 'pointer', paddingRight: '25px' }} onClick={() => setShowMenu(!showMenu)}>
                  &#9776;
                </div>

                {/* Mobile Menu */}
                {showMenu && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '15px 0', backgroundColor: '#fff', position: 'absolute', top: 50, left: 0, width: '100%', zIndex: 1100 }}>
                    {/* Text section 1 */}
                    <div>
                      <a href="https://saathi.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '60px' }}>About</a>
                    </div>

                    <div>
                      <a href="https://visa.saathi.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '60px' }}>Get Visa</a>
                    </div>

                    {/* Text section 2 */}
                    <div>
                      <a href="https://saathiapp.onelink.me/I342/t4ek7oi9" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '60px' }}>Download App</a>
                    </div>
                    <div>
                      <a href="https://blog.saathi.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '60px' }}>Blog</a>
                    </div>
                    {/* Text section 3 */}
                    <div>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLScWUyqSZidaqJiO1bt9wj4rJSxLM8U0NicYX55y3R6MslWaNQ/viewform" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '60px' }}>Partners</a>
                    </div>

                    {/* Text section 4 */}
                    <div>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSey8QQWD7lXE44MYamKU0my7aIuElO3lpvlZnKH5Ir6NFweow/viewform" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '60px' }}>Creators</a>
                    </div>

                    {/* Text section 5 */}

                  </div>
                )}
              </div>
            </Box>

            {/* Desktop Header */}
            <Box
              sx={{
                width: '100%',
                height: 50,
                display: { xs: 'none', sm: 'flex' }, // Show flex display on larger screens, hide on small screens
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '3px 35px', // Adjusted padding for spacing
                backgroundColor: '#fff', // Adjusted background color
                position: 'fixed', // Changed to fixed positioning
                top: 0,
                zIndex: 1200,
              }}
            >
              {/* Logo */}
              <div style={{ display: 'flex', gap: '9px', padding: '0px 0px 0px 61px', alignItems: 'center' }}>
                <img src="/images/website/Saathi_img.png" alt="Logo" style={{ width: '28.24px', height: '46px', justifyContent: 'center' }} />
                <div style={{ alignItems: 'baseline', display: 'flex', gap: '7px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '36px', color: 'rgba(96, 92, 212, 212)', padding: '0px 0px', fontFamily: 'Nunito Sans, sans-serif' }}>Saathi</div>
                  <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif' }}>Visa</div>
                </div>
              </div>

              {/* Text sections */}
              <div style={{ display: 'flex', gap: '35px', padding: '5px 25px 0px 0px' }}>
                {/* Text section 1 */}
                <div>
                  <a href="https://saathi.app/about-us" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>About</a>
                </div>
                <div>
                  <a href="https://visa.saathi.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Get Visa</a>
                </div>

                {/* Text section 2 */}
                <div>
                  <a href="https://saathiapp.onelink.me/I342/t4ek7oi9" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Download App</a>
                </div>
                <div>
                  <a href="https://blog.saathi.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Blog</a>
                </div>
                {/* Text section 3 */}

                <div>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLScWUyqSZidaqJiO1bt9wj4rJSxLM8U0NicYX55y3R6MslWaNQ/viewform" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Partners</a>
                </div>
                {/* Text section 4 */}
                <div>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSey8QQWD7lXE44MYamKU0my7aIuElO3lpvlZnKH5Ir6NFweow/viewform" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Creators</a>
                </div>
                {/* Text section 5 */}

              </div>
            </Box>
          </>


          <Box sx={{ position: 'relative' }}>
            <img src="/images/website/back_cover.jpg" alt="Twitter Cover" style={{ width: '100vw', height: 360 }} />
            <Box
              id="searchBar"
              sx={{
                position: 'absolute',
                top: '63%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1100,
                width: ['70%', 520], // Set width to 90% for mobile, and 520px for desktop
                height: ['15%', 47], // Adjusted height to 45px
                padding: ['1px 12px 5px', '1px 7px 11px'], // Adjusted padding
                backgroundColor: 'white',
                borderRadius: 30,
                boxShadow: stickySearchBar ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
                display: 'flex',
                alignItems: 'center', // Center vertically
                justifyContent: 'center', // Center horizontally
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <TextField
                  variant="standard"
                  label="📍 India"
                  disabled
                  InputProps={{
                    disableUnderline: true
                  }}
                  InputLabelProps={{
                    style: { textAlign: 'center', color: 'black', fontFamily: 'Nunito Sans, sans-serif' } // Center-align the label text
                  }}
                  sx={{
                    width: ['50%', 130],
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiInputLabel-root': { // Selecting the label element
                      textAlign: 'left', // Center-align the label text
                    }
                  }}
                />
                <Autocomplete
                  disablePortal
                  options={countriesData.map((country) => country.countryName)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="✈️     Where to..."
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      // onChange={(event) => setSearchTerm(event.target.value)}
                      onChange={(event, newValue) => {
                        debouncedSetSearchTerm(event.target.value || '');
                      }}
                      InputLabelProps={{
                        style: { color: 'grey', fontFamily: 'Nunito Sans, sans-serif' }, // Center-align the label text
                      }}
                    />
                  )}
                  value={searchTerm || null}
                  onChange={(event, newValue) => {
                    debouncedSetSearchTerm(newValue || '');
                  }}
                  isOptionEqualToValue={(option, value) => 
                    option === value || (!option && !value)
                  }
                  sx={{
                    width: ['90%', 300],
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiInputLabel-root': {
                      textAlign: 'center',
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Visa Filters */}
        <Box
          id="visaFilters"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            padding: ['60px 40px 20px 10px', '60px 40px 20px 50px'], // Adjusted padding
            position: 'sticky',
            top: [stickySearchBar ? 25 : 5, 5],
            left: 0,
            right: 0,
            gap: 2,
            width: 'calc(100% + 20px)', // Adjusted width
            marginLeft: '-30px', // Adjusted marginLeft
            backgroundColor: stickySearchBar ? '#fff' : 'transparent',
            zIndex: 1050,
            overflowX: 'auto', // Enable horizontal scrolling
            '@media (min-width: 600px)': {
              overflowX: 'unset', // Remove horizontal scrolling on larger screens
            },
          }}
        >
          {visaTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              onClick={() => handleVisaFilterChange(type)}
              variant={visaFilters.includes(type) ? 'filled' : 'outlined'}
              sx={{
                width: 160,
                height: 45,
                borderRadius: 4,
                backgroundColor: visaFilters.includes(type) ? '#605CD4' : 'white',
                color: visaFilters.includes(type) ? 'white' : 'black',
                boxShadow: stickySearchBar ? 'transparent' : '5px 7px 4px rgba(0, 0, 0, 0.2)',
                fontSize: 17,
                fontFamily: 'Nunito Sans, sans-serif',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: visaFilters.includes(type) ? '#5044b8' : '#f0f0f0',
                },
              }}
            />
          ))}

          {/* Empty spacer to push Sort By chip to the right */}
          <div style={{ flex: 1 }} />

          {/* Sort By */}
          {!stickySearchBar && (
            <Chip
              label="Sort By"
              variant="outlined"
              sx={{
                width: 160,
                height: 45,
                borderRadius: 4,
                backgroundColor: 'white',
                fontFamily: 'Nunito Sans, sans-serif',
                color: 'black',
                boxShadow: stickySearchBar ? '0 2px 5px rgba(0,0,0,0.4)' : '5px 7px 4px rgba(0, 0, 0, 0.1)',
                fontSize: 17,
                fontWeight: 500,
                marginRight: 5,
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                '@media (max-width: 599px)': {
                  display: 'none', // Hide on mobile screens
                },
                '@media (min-width: 600px)': {
                  display: 'flex', // Show on desktop screens
                },
              }}
            />
          )}
          {stickySearchBar && (
            <Box
              id="searchBar"
              sx={{
                position: 'absolute',
                top: '66%',
                right: '2%', // Adjusted to align with the right side
                transform: 'translateY(-50%)', // Changed to translateY for vertical centering
                zIndex: 1000,
                width: 380,
                height: 0,
                padding: '1px 19px 55px',
                backgroundColor: 'white',
                borderRadius: 5,
                marginRight: 5,
                boxShadow: stickySearchBar ? '0 2px 5px rgba(0,0,0,0.4)' : 'none',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'start',
                justifyItems: 'center',
                alignContent: 'center',
                '@media (max-width: 599px)': {
                  display: 'none', // Hide on mobile screens
                },
                '@media (min-width: 600px)': {
                  display: 'flex', // Show on desktop screens
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <TextField
                  variant="standard"
                  label="📍 India"
                  disabled
                  InputProps={{
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    style: { textAlign: 'center', color: 'black' },
                  }}
                  sx={{
                    width: 90,
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiInputLabel-root': {
                      textAlign: 'left',
                    },
                  }}
                />
                <Autocomplete
                  disablePortal
                  options={countriesData.map((country) => country.countryName)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="✈️     Where to..."
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      onChange={(event, newValue) => {
                        debouncedSetSearchTerm(event.target.value || '');
                      }}
                      InputLabelProps={{
                        style: { color: 'grey', fontFamily: 'Nunito Sans, sans-serif' }, // Center-align the label text
                      }}
                    />
                  )}
                  // onInputChange={(event, newInputValue) => {
                  //   setSearchTerm(newInputValue);
                  // }}
                  value={searchTerm || null}
                
                  isOptionEqualToValue={(option, value) => 
                    option === value || (!option && !value)
                  }
                  sx={{
                    width: 200,
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiInputLabel-root': {
                      textAlign: 'center',
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>

        <Grid container spacing={5} sx={{ p: 2 }}>
          {filteredCountries.map((country, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              < CountryCard key={country.slug} country={country}
                countryName={country.countryName}
                visaType={country.visaType}
                details={country.capital}
                imageUrl={country.imageUrl}
              />
            </Grid>
          ))}
        </Grid>
        <GoToTopButton/>
      </Box>
     
    </>
  );
};

export default App;

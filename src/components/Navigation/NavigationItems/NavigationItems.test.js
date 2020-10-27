import Adapter from "enzyme-adapter-react-16";
import {configure,shallow} from 'enzyme';
import React from 'react';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()})

let wrapper;
beforeEach(()=>{
    wrapper=shallow(<NavigationItems/>);
})

describe('<NavigationItems/>', ()=>{
    it('should have 2 <NavigationItem/> if not authenticated',()=>{
        expect(wrapper.find(NavigationItem))
        .toHaveLength(2);
    })

    it('should have 3 <NavigationItem/> if authenticated',()=>{
        const wrapper=shallow(<NavigationItems isAuth/>);
        expect(wrapper.find(NavigationItem))
        .toHaveLength(3);
    })

    it('should have logout if authenticated',()=>{
        const wrapper=shallow(<NavigationItems isAuth/>);
        //wrapper.setProps({isAuth:true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>))
        .toEqual(true);
    })

})



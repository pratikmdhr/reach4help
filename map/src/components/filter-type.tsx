import React from 'react';
import Select, { ValueType } from 'react-select';
import Chevron from 'src/components/assets/chevron';
import { Language, t } from 'src/i18n';
import { Filter, UpdateFilter } from 'src/state';

import styled from '../styling';
import { AppContext } from './context';

type OptionType = {
  value: string | undefined;
  label: string;
};

interface Props {
  className?: string;
  translationKey: 'markerTypes' | 'services' | ['hiddenMarkers', 'filter'];
  dropDownValues: readonly string[];
  filter: Filter;
  updateFilter: UpdateFilter;
}

class FilterType extends React.Component<Props, {}> {
  private changeService = (
    fieldName: string,
    selectedValue: ValueType<OptionType>,
  ): void => {
    if (selectedValue) {
      this.props.updateFilter(fieldName, (selectedValue as OptionType).value);
    }
  };

  private select = (lang: Language) => {
    const { className, filter } = this.props;

    const getTranslation = (
      s: any,
      translationKey: string | [string, string],
      value: string,
    ): string => {
      if (typeof translationKey === 'string' && s[translationKey]) {
        return s[translationKey][value];
      } else if (s[translationKey[0]][translationKey[1]]) {
        return s[translationKey[0]][translationKey[1]][value];
      }
      return value;
    };

    const optionsMap = new Map(
      this.props.dropDownValues.map(value => [
        value,
        {
          value,
          label: t(lang, s =>
            getTranslation(s, this.props.translationKey, value),
          ),
        },
      ]),
    );

    const filterFieldName =
      typeof this.props.translationKey === 'string'
        ? this.props.translationKey
        : this.props.translationKey[0];

    const any: OptionType = {
      value: undefined,
      label: t(lang, s => s.services.any),
    };

    const options: OptionType[] = [any, ...optionsMap.values()];

    const searchInOptions = filter[filterFieldName];
    const value =
      typeof searchInOptions !== 'undefined'
        ? optionsMap.get(searchInOptions)
        : undefined;

    return (
      <Select
        className={className}
        classNamePrefix="select"
        value={value}
        onChange={selectedValue =>
          this.changeService(filterFieldName, selectedValue)
        }
        options={options}
        isSearchable={false}
        components={{
          DropdownIndicator: () => <Chevron className="chevron" />,
          IndicatorSeparator: () => null,
        }}
      />
    );
  };

  public render() {
    return (
      <AppContext.Consumer>
        {({ lang }) => this.select(lang)}
      </AppContext.Consumer>
    );
  }
}

export default styled(FilterType)`
  .select__control {
    border: 1px solid ${p => p.theme.colors.borderBase};
    box-shadow: none;
    cursor: pointer;
    background: none;
    border-radius: 4px;
    justify-content: center;
    align-items: middle;
    min-height: initial;
    padding: 5px 4px;
    font-size: 14px;
    line-height: 22px;
    color: ${p => p.theme.colors.brand.primaryDark1};

    .chevron {
      color: ${p => p.theme.colors.brand.primaryDark1};
      opacity: 0.6;
      margin: 0 2px;
    }

    .select__value-container {
      margin: 0;
      padding: 0;
      height: 22px;
    }

    &.select__control--menu-is-open {
      .chevron {
        transform: rotate(180deg);
      }
    }

    &:hover,
    &.select__control--is-focused {
      border-color: ${p => p.theme.colors.brand.primaryDark};
      .single-value,
      .chevron {
        color: ${p => p.theme.colors.brand.primaryDark};
      }
    }
  }
  .select__menu {
    width: initial;
    min-width: 100%;
  }
  .select__option {
    cursor: pointer;
    white-space: nowrap;
  }
  .select__option--is-focused {
    background: ${p => p.theme.colors.brand.primaryLight1};
  }
  .select__option--is-selected {
    background: ${p => p.theme.colors.brand.primary};
  }
`;

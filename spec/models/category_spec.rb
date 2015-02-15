require 'rails_helper'
require 'mongoid_helper'

RSpec.describe Category, type: :model do

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:code) }
  it { is_expected.to validate_presence_of(:subcategory_name) }
  it { is_expected.to validate_presence_of(:subcategory_code) }
  it { is_expected.to have_and_belong_to_many(:attractions) }

end

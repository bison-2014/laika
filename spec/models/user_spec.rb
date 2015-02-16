require 'rails_helper'
require 'mongoid_helper'

RSpec.describe User, type: :model do

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:password) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_uniqueness_of(:email) }
  it { is_expected.to have_many(:trips) }
  it { is_expected.to have_many(:interests).of_type(Category) }
end

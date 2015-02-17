class UsersController < ApplicationController

  def new
    render 'new'
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id.to_s
      redirect_to root_path
    else
      render 'new'
    end
  end

  def profile
    @interests = Category.distinct(:name)
    @user_interests = current_user.interests.distinct(:name)
    render 'edit'
  end

  def update
    @interests = Category.distinct(:name)
    @user_interests = current_user.interests.distinct(:name)

    10.times {puts}
    p user_params
    current_user.update_attributes(password: user_params[:password],
                      password_confirmation: user_params[:password_confirmation])
    current_user.interests = Category.in(name: user_params[:interests]).all.to_a

    if current_user.valid?
      current_user.save!
      flash[:success] = true
      redirect_to users_profile_path
    else
      flash.now[:errors] = current_user.errors
      render 'edit'
    end
  end

  private
  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :'interests' => [])
  end

end